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

;(async () => {
  const response = await needle('get', twitterApi, params, options)
  const tweets = response.body.data
  tweets.forEach(tweet => {
    tweet.date = tweet.created_at
    tweet.content = tweet.text
    delete tweet.created_at
    delete tweet.text
  })
  
  const postResponse = await needle('post', googleSheets, JSON.stringify(tweets) )

  console.log(postResponse)
})();