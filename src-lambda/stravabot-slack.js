import AWS from "aws-sdk";
import qs from "qs";
import fetch from "node-fetch";
import subWeeks from "date-fns/sub_weeks";

require("dotenv").config();

const listObjects = (client, request) =>
  new Promise((resolve, reject) => {
    client.listObjectsV2(request, (error, data) => {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  });

const getObject = (client, request) =>
  new Promise((resolve, reject) => {
    client.getObject(request, (error, data) => {
      if (error) {
        return reject(error);
      }

      return resolve(data.Body.toString());
    });
  });

exports.handler = async (event, context, callback) => {
  const s3Client = new AWS.S3({
    accessKeyId: process.env.TM_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.TM_AWS_ACCESS_KEY_SECRET,
  });
  const objects = await listObjects(s3Client, {
    Bucket: process.env.TM_AWS_S3_BUCKET_PATH,
  });

  const athletes = objects.Contents.map(async ({ Key }) => {
    const object = await getObject(s3Client, {
      Bucket: process.env.TM_AWS_S3_BUCKET_PATH,
      Key,
    });

    const objectJson = JSON.parse(object);

    const params = {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: objectJson.refresh_token,
      grant_type: "refresh_token",
    };

    try {
      const response = await fetch(
        `https://www.strava.com/oauth/token?${qs.stringify(params)}`,
        {
          method: "POST",
        }
      );
      const { access_token } = await response.json();
      return {
        access_token,
        name: objectJson.name,
        athleteId: objectJson.athleteId,
      };
    } catch (err) {
      console.log("fetch access token error", err);
    }
  });

  const athleteDistances = athletes.map(async (athlete) => {
    const data = await athlete;
    console.log("data", data);
    try {
      console.log("access token", data.access_token);
      const dateMinus1Week = subWeeks(new Date(), 1);
      const epoch = new Date(dateMinus1Week).getTime() / 1000;
      const params = {
        after: epoch,
      };
      const response = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?${qs.stringify(
          params
        )}`,
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );
      const activities = await response.json();

      const distance = activities.reduce(
        (acc, { type, distance }) => (type === "Run" ? acc + distance : acc),
        0
      );
      return {
        id: data.athleteId,
        name: `${data.name.first} ${data.name.last}`,
        totalDistance: distance,
      };
    } catch (err) {
      console.log("fetch activities error", err);
    }
  });

  const distances = await Promise.all(athleteDistances);
  console.log(distances);

  const strings = distances.map(
    ({ name, totalDistance }) => `${name}: ${totalDistance / 1000}km`
  );

  const body = JSON.stringify({
    text: `Total distances run by TotallyRunning club members this week:\n${strings.join(
      "\n"
    )}`,
  });
  try {
    await fetch(
      "https://hooks.slack.com/services/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",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );
  } catch (err) {
    console.error(err);
  }

  return callback(null, {
    statusCode: 200,
    body,
  });
};