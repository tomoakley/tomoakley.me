import fetch from 'node-fetch'
import getYear from 'date-fns/get_year'
import getDate from 'date-fns/get_date'
import format from 'date-fns/format'
import _find from 'lodash/find'

require('dotenv').config()

export async function handler(event, context) {
  const { serviceId, stationCode } = event.queryStringParameters

  // Get National Rail auth token
  const getTrainDataAtSpecificStation = (date) => new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://${process.env.RTT_ROOT_URL}/service/${serviceId}/${getYear(date)}/${format(date, 'MM')}/${getDate(date)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${process.env.RTT_AUTH}`,
          'Referer': 'http://localhost:9000'
        },
      })

      const data = await response.json()

      return resolve(_find(data.locations, ['crs', stationCode]))

    } catch (err) {
      console.log('error', err)
      reject(err)
    }
  })

  const { realtimeArrival, gbttBookedArrival } = await getTrainDataAtSpecificStation(new Date())

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
    await fetch(`https://${process.env.MORNINGBOT_SLACK_HOOK}`, {
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
