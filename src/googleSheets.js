const needle = require('needle')
const dotenv = require('dotenv');
const savedIds = require('./savedIds');
dotenv.config({ path: __dirname + '/../.env' })

const bearerToken = process.env.BEARER_TOKEN;

const options = {
  headers: {
    "Authorization": `Bearer ${bearerToken}`
  }
}

const twitterApi = "https://api.twitter.com/2/tweets"
const googleSheets = process.env.SHEETS

const ids = savedIds

const params = {
  ids: ids.slice(101).join(','),
  "tweet.fields": "created_at"
}

const seedSheet = async () => {
  const redirectOptions = {
    follow_max: 5
  }
  const response = await needle('get', twitterApi, params, options)
  const tweets = response.body.data
  
  const postResponse = await needle('post', googleSheets, JSON.stringify(tweets), redirectOptions)

  console.log(postResponse.body)
};

const idsFromSheet = async () => {

  const options = {
    follow_max: 5
  }

  const { body: response } = await needle('get', googleSheets, options)

  return response.tweets.map(tweet => tweet.id)
}

module.exports = {
  idsFromSheet,
  seedSheet
}