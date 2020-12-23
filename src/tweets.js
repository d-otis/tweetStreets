const needle = require('needle');
const sendMail = require('./mailer')
const dotenv = require('dotenv').config();
const MAILED_TWEETS = require('./mailedTweets')

const userId = 117424097;
const url = `https://api.twitter.com/2/users/${userId}/tweets`;
const bearerToken = process.env.BEARER_TOKEN;

const getUserTweets = async () => {
  console.log('getUserTweets() started')
  let userTweets = [];
  let username
  let params = {
    "max_results": 100,
    "tweet.fields": "created_at",
    "expansions": "author_id",
    "start_time": "2020-01-01T04:00:00Z",
    "end_time": new Date().toISOString().split('.')[0] + "Z"
  }

  const options = {
    headers: {
      "authorization": `Bearer ${bearerToken}`
    }
  }

  let hasNextPage = true;
  let nextToken = null;
  console.log("Retrieving Tweets...");
  while (hasNextPage) {
    let resp = await getPage(params, options, nextToken);
    if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
      if (resp.data) {
        userTweets.push.apply(userTweets, resp.data);
      }
      username = resp.includes.users[0].username
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false
      }
      // nextToken = resp.meta.next_token ? resp.meta.next_token : null
    } else {
      hasNextPage = false;
    }
  }

  let matchingTweets = parseTweets(userTweets)
  let tweetQueue = []
  if (matchingTweets.length > 0) {
    matchingTweets.forEach(tweet => {
      if (!MAILED_TWEETS.includes(tweet.id)) {
        tweetQueue.push(tweet)
        MAILED_TWEETS.push(tweet.id)
      }
    })

    if (tweetQueue.length > 0) {
      sendMail(tweetQueue)
    } else {
      console.log('no new relevant tweets')
    }
  }
}
let count = 1
const getPage = async (params, options, nextToken) => {
  if (nextToken) {
    params.pagination_token = nextToken;
    console.log(`#${count}: nextToken is ${nextToken}`)
    count++
  }

  try {
    const resp = await needle('get', url, params, options);

    if (resp.statusCode != 200) {

      console.log(`${resp.statusCode} ${resp.statusMessage}:`);
      resp.body.errors.forEach(error => console.log(`${error.message} \n`))
      return;
    }
    return resp.body;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
}

const parseTweets = tweetArray => {
  let parsedTweets = []
  tweetArray.filter(tweet => {
    if (tweet.text.includes('resume') || tweet.text.includes('suspended')) {
      parsedTweets.push(tweet)
    }
  })
  return parsedTweets
}

exports.getUserTweets = getUserTweets