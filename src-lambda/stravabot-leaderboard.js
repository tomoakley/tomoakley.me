import fetch from "node-fetch";

import { siteUrl } from "./utils/oauth";

exports.handler = async (event, context, callback) => {
  if (event.httpMethod === "POST") {
    try {
      const response = await fetch(
        `${siteUrl}/.netlify/functions/stravabot-slack`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(data),
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
