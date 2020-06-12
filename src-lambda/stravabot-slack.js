import qs from "qs";
import fetch from "node-fetch";
import subWeeks from "date-fns/sub_weeks";

import S3Client from "./utils/Aws";

require("dotenv").config();

exports.handler = async (event, context, callback) => {
  const s3 = new S3Client();
  const objects = await s3.list({
    Bucket: process.env.TM_AWS_S3_BUCKET_PATH,
  });

  const athletes = objects.Contents.map(async ({ Key }) => {
    const object = await s3.get({
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
  distances.sort((a, b) => b.totalDistance - a.totalDistance);

  const strings = distances.map(
    ({ name, totalDistance }, i) =>
      `${i}/ ${name}: ${Number.parseFloat(totalDistance / 1000).toFixed(2)}km`
  );

  const body = JSON.stringify({
    text: `Total distances run by TotallyRunning club members this week:\n${strings.join(
      "\n"
    )}`,
  });
  try {
    await fetch(`https://${process.env.TM_SLACK_HOOK}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  } catch (err) {
    console.error(err);
  }

  return callback(null, {
    statusCode: 200,
    body,
  });
};
