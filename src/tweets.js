const needle = require("needle");
const { sendMail, sendErrorEmail } = require("./mailer");
const dotenv = require("dotenv");
const dayjs = require("dayjs");
const dayOfYear = require("dayjs/plugin/dayOfYear");
const {
  saveTweetsToSheet,
  idsFromSheet,
  getEmailsFromSheet,
} = require("./googleSheets");
dotenv.config({ path: __dirname + "/../.env" });
dayjs.extend(dayOfYear);

const userId = 117424097; // Philly Dept Sanitation Account ID
const url = `https://api.twitter.com/2/users/${userId}/tweets`;
const bearerToken = process.env.BEARER_TOKEN;

const getUserTweets = async () => {
  try {
    const savedIds = await idsFromSheet();

    const time = () => {
      let today = dayjs();
      let sevenDaysAgo = today.subtract(7, "day");
      const formatTime = (raw) => raw.toISOString().split(".")[0] + "Z";

      return {
        today: formatTime(today),
        lastWeek: formatTime(sevenDaysAgo),
      };
    };

    const { today, lastWeek } = time();

    let userTweets = [];
    let params = {
      max_results: 100,
      "tweet.fields": "created_at",
      expansions: "author_id",
      start_time: lastWeek,
      end_time: today,
    };

    const options = {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    };

    let hasNextPage = true;
    let nextToken = null;

    console.log(`${new Date()} - Retrieving Tweets`);

    let username;

    while (hasNextPage) {
      let resp = await getPage(params, options, nextToken);

      if (
        resp &&
        resp.meta &&
        resp.meta.result_count &&
        resp.meta.result_count > 0
      ) {
        if (resp.data) {
          userTweets.push.apply(userTweets, resp.data);
        }
        username = resp.includes.users[0].username;
        if (resp.meta.next_token) {
          nextToken = resp.meta.next_token;
        } else {
          hasNextPage = false;
        }
      } else {
        hasNextPage = false;
      }
    }

    let matchingTweets = parseTweets(userTweets);
    let tweetQueue = [];
    if (matchingTweets.length > 0) {
      matchingTweets.forEach((tweet) => {
        if (savedIds && !savedIds.includes(tweet.id)) tweetQueue.push(tweet);
      });

      if (tweetQueue.length > 0) {
        const emailRecipients = await getEmailsFromSheet();
        const { response } = await sendMail(tweetQueue, emailRecipients);
        if (response.split(" ")[0] == 250) {
          saveTweetsToSheet(tweetQueue);
          console.log(`${new Date()} - Emails Sent - ${response}`);
        }
      } else {
        console.log(`${new Date()} - No New Relevant Tweets`);
      }
    } else {
      console.log(`${new Date()} - No New Relevant Tweets`);
    }
  } catch (error) {
    console.error(`Error @ ${new Date().toISOString()} => ${error}`);
    sendErrorEmail(error);
  }
};

let count = 1;
const getPage = async (params, options, nextToken) => {
  if (nextToken) {
    params.pagination_token = nextToken;
    console.log(`#${count}: nextToken is ${nextToken}`);
    count++;
  }

  try {
    const resp = await needle("get", url, params, options);

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:`);
      resp.body.errors.forEach((error) => console.log(`${error.message} \n`));
      return;
    }
    return resp.body;
  } catch (err) {
    console.log("=============================");
    console.log("=============error================");
    console.log("=============================");
    console.error(
      `getPage() Request failed @${new Date().toISOString()} ==> ${err}`
    );
    sendErrorEmail(err);
  }
};

const parseTweets = (tweetArray) => {
  let parsedTweets = [];
  const testForKeywords = (tweet) => {
    return (
      (tweet.text.includes("resume") ||
        tweet.text.includes("suspended") ||
        tweet.text.includes("delay") ||
        tweet.text.includes("collection")) &&
      !tweet.text.includes("TriviaTuesday")
    );
  };

  tweetArray.filter((tweet) => {
    if (testForKeywords(tweet)) {
      parsedTweets.push(tweet);
    }
  });
  return parsedTweets;
};

module.exports = {
  getUserTweets,
  parseTweets,
};
