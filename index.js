const needle = require('needle');
const sendMail = require('./mailer')
const dotenvMe = require('./env.util')

const userId = 117424097;
const url = `https://api.twitter.com/2/users/${userId}/tweets`;
const bearerToken = process.env.BEARER_TOKEN;

const getUserTweets = async () => {
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

    console.log(userTweets);
    console.log(`Got ${userTweets.length} Tweets from ${username}!`);

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

getUserTweets();

// create date obj/determine the date
// iterate through getUserTweets[] and check if created_at === todaysDate
// if the dates match and they include 'collections' || 'suspended' || 'resume'
// then add to new[]
// finally email flagged tweets