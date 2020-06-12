import fetch from "node-fetch";

import { siteUrl } from "./utils/oauth";

require("dotenv").config();

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === "POST") {
    console.log(Buffer.from(event.body, "base64").toJSON());
    try {
      await fetch(`https://${process.env.TM_SLACK_HOOK}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `<${siteUrl}/.netlify/functions/stravabot-auth|Authenticate> with the TotallyRunning Strava slack bot.`,
              },
            },
          ],
        }),
      });
      return callback(null, {
        statusCode: 200,
        body: "success",
      });
    } catch (err) {
      console.error("auth error", err);
      return callback(null, {
        statusCode: 500,
        body: err.message,
      });
    }
  }
};
