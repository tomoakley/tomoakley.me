import oauth2, { config } from "./utils/oauth";
import AWS from "aws-sdk";

/* Function to handle intercom auth callback */
exports.handler = (event, context, callback) => {
  const putObject = (client, request) =>
    new Promise((resolve, reject) => {
      client.putObject(request, (error, data) => {
        if (error) {
          console.log("put object error", error);
          return reject(error);
        }

        console.log("put object success");
        return resolve(data);
      });
    });

  const createPutPublicJsonRequest = (location, filename, contents) => {
    const request = {
      Bucket: location,
      Key: filename,
      Body: contents,
      ContentType: "application/json; charset=utf-8",
    };

    return request;
  };
  const code = event.queryStringParameters.code;
  const s3Client = new AWS.S3({
    accessKeyId: process.env.TM_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.TM_AWS_ACCESS_KEY_SECRET,
  });

  /* Take the grant code and exchange for an accessToken */
  oauth2.authorizationCode
    .getToken({
      code: code,
      redirect_uri: config.redirect_uri,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    })
    .then((result) => {
      const token = oauth2.accessToken.create(result);
      console.log("accessToken", token);
      return token;
    })
    // Do stuff with user data & token
    .then(async ({ token: { athlete, refresh_token } }) => {
      const s3PutRequest = createPutPublicJsonRequest(
        process.env.TM_AWS_S3_BUCKET_PATH,
        `${athlete.id}.json`,
        JSON.stringify({
          athleteId: athlete.id,
          name: {
            first: athlete.firstname,
            last: athlete.lastname,
          },
          refresh_token: refresh_token,
        })
      );
      const s3Response = await putObject(s3Client, s3PutRequest);
      console.log("s3 res", s3Response);
      // return results to browser
      return callback(null, {
        statusCode: 200,
        body: "All done! You can return to Slack now.",
      });
    })
    .catch((error) => {
      console.log("Access Token Error", error.message);
      console.log(error);
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message,
        }),
      });
    });
};
