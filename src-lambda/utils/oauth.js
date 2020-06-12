import simpleOauth from "simple-oauth2";

const stravaApi = "https://www.strava.com/api/v3";
/* process.env.URL from netlify BUILD environment variables */
const siteUrl = process.env.URL || "http://localhost:9000";

require("dotenv").config();

export const config = {
  clientId: process.env.STRAVA_CLIENT_ID,
  clientSecret: process.env.STRAVA_CLIENT_SECRET,
  tokenHost: "https://strava.com",
  authorizePath: `https://www.strava.com/oauth/authorize`,
  tokenPath: `https://www.strava.com/oauth/token`,
  redirect_uri: `${siteUrl}/.netlify/functions/stravabot-auth-callback`,
};

function authInstance(credentials) {
  if (!credentials.client.id) {
    throw new Error("MISSING REQUIRED ENV VARS. Please set STRAVA_CLIENT_ID");
  }
  if (!credentials.client.secret) {
    throw new Error(
      "MISSING REQUIRED ENV VARS. Please set STRAVA_CLIENT_SECRET"
    );
  }
  // return oauth instance
  return simpleOauth.create(credentials);
}

/* Create oauth2 instance to use in our two functions */
export default authInstance({
  client: {
    id: config.clientId,
    secret: config.clientSecret,
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath,
  },
});
