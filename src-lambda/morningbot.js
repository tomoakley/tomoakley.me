import fetch from 'node-fetch'

export async function handler(event, context) {

  // Get National Rail auth token
  const { services }= async () => new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('https://api.rtt.io/api/v1/json/search/WDT/to/PAD', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic rttapi_tomoakley:ad0ef52c9206a11a96b4b5589fb93722de0dcc1a'
        },
      })
      resolve(await response.json())
    } catch (err) {
      reject(err)
    }
  })

  const myTrain = services[2]

  const { locationDetail: { realtimeArrival, gbttBookedArrival } } = myTrain

  const minutesLateBy = realtimeArrival - gbttBookedArrival 

  const message = minutesLateBy < 2
    ? `The ${gbttBookedArrival} is on time! ETA ${realtimeArrival}`
    : `The ${gbttBookedArrival} is ${minutesLateBy} minutes late.`

  /* TODO:
   * 1. Get status for Circle/H&C line at ~8:25
   * 2. Do the same for the evening (17:30 for both Circle/H&C/Northern and GWR)
   */

  const slackMessage = `Morning Tom! ${message}.`

  // Send to Slack
  const body = JSON.stringify({ text: slackMessage });
  try {
    await fetch('https://hooks.slack.com/services/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', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 200,
    body
  };
}