const needle = require('needle');
const sendMail = require('./src/mailer')
const dotenv = require('dotenv').config();
const MAILED_TWEETS = require('./src/mailedTweets')

const userId = 117424097;
const url = `https://api.twitter.com/2/users/${userId}/tweets`;
const bearerToken = process.env.BEARER_TOKEN;

const getUserTweets = async () => {
    console.log('getUserTweets() started')
    let userTweets = [];
    let username
    let params = {
        "max_results": 10,
        "tweet.fields": "created_at",
        "expansions": "author_id"
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
          // console.log('username: ', resp.includes.users.username)
            if (resp.data) {
                userTweets.push.apply(userTweets, resp.data);
            }
            username = resp.includes.users[0].username
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            }
        } else {
            hasNextPage = false;
        }
    }

    let matchingTweets = parseTweets(userTweets)
    let tweetQueue = []
    if (matchingTweets.length > 0) {
        matchingTweets.forEach(tweet => {
            if(!MAILED_TWEETS.includes(tweet.id)) {
                tweetQueue.push(tweet)
                MAILED_TWEETS.push(tweet.id)
            }
        })
        tweetQueue.length > 0 ? sendMail(tweetQueue) : console.log('no new relevant tweets')
    }
}

const getPage = async (params, options, nextToken) => {
    if (nextToken) {
        params.next_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
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
        if(tweet.text.includes('resume') || tweet.text.includes('suspended')) {
            parsedTweets.push(tweet)
        }
    })
    return parsedTweets
}


console.log('script starting')
getUserTweets()
// setInterval(getUserTweets, 60000)