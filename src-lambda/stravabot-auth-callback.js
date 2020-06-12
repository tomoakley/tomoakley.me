import oauth2, { config } from "./utils/oauth";
import S3Client from "./utils/Aws";

exports.handler = async (event, context, callback) => {
  const { code } = event.queryStringParameters;
  const s3 = new S3Client();

  try {
    const {
      token: { athlete, refresh_token },
    } = oauth2.accessToken.create(
      await oauth2.authorizationCode.getToken({
        code: code,
        redirect_uri: config.redirect_uri,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      })
    );

    await s3.put({
      Bucket: process.env.TM_AWS_S3_BUCKET_PATH,
      Key: `${athlete.id}.json`,
      Body: JSON.stringify({
        athleteId: athlete.id,
        name: {
          first: athlete.firstname,
          last: athlete.lastname,
        },
        refresh_token: refresh_token,
      }),
    });

    return callback(null, {
      statusCode: 200,
      body: "All done! You can return to Slack now.",
    });
  } catch (error) {
    console.log("Access Token Error", error.message);
    console.log(error);

    return callback(null, {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message,
      }),
    });
  }
};
