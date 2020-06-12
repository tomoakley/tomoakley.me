import oauth2, { config } from "./utils/oauth";

require("dotenv").config();

export async function handler(event, context) {
  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
    /* Specify how your app needs to access the user’s account. http://bit.ly/intercom-scopes */
    scope: "read,activity:read",
    /* State helps mitigate CSRF attacks & Restore the previous state of your app */
    state: "",
  });

  /* Redirect user to authorizationURI */
  return {
    statusCode: 302,
    headers: {
      Location: authorizationURI,
      "Cache-Control": "no-cache", // Disable caching of this response
    },
    body: "", // return body for local dev
  };
}
