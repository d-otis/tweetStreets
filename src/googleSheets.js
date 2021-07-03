const needle = require('needle')
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/../.env' })

const bearerToken = process.env.BEARER_TOKEN
const googleSheets = process.env.SHEETS
const twitterApi = "https://api.twitter.com/2/tweets"

const bearerAuthHeaderOptions = {
  headers: {
    "Authorization": `Bearer ${bearerToken}`
  }
}

const redirectOptions = {
  follow_max: 5
}

const seedSheet = async () => {
  const params = {
    ids: ids.slice(101).join(','),
    "tweet.fields": "created_at"
  }

  const response = await needle('get', twitterApi, params, bearerAuthHeaderOptions)
  const tweets = response.body.data
  const postResponse = await needle('post', googleSheets, JSON.stringify(tweets), redirectOptions)

  console.log(postResponse.body)
};

const idsFromSheet = async () => {
  try {
    const { body: response } = await needle('get', googleSheets, redirectOptions)
    return response.tweets.map(tweet => tweet.id)
  } catch (error) {
    console.error(`idsFromSheet() Error: ${error}`)
  }
}

/** 
* Save Tweets to Google Sheets
* @param {Array} tweets
*/
const saveTweetsToSheet = async (tweets) => {
  try {
    const response = await needle('post', googleSheets, JSON.stringify(tweets), redirectOptions)
    console.log({body: response.body.body})
  } catch (error) {
    console.error(`saveTweetsToSheet() Error: ${error}`)
  }

}

const getEmailsFromSheet = async () => {
  try {
    const { body: response } = await needle('get', googleSheets, redirectOptions)
    return response.emails
  } catch (error) {
    console.error(`getEmailsFromSheet() Error: ${error}}`)
  }
}

module.exports = {
  idsFromSheet,
  seedSheet,
  saveTweetsToSheet,
  getEmailsFromSheet
}