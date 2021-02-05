const fs = require('fs')
const path = require('path')

const persistTweetIds = tweets => {
  const ids = tweets.map(tweet => tweet.id)
  ids.forEach(num => {
    fs.appendFileSync(`${path.join(__dirname, '..')}/db/ids.txt`, num + ",", (err) => {
      if (err) throw err;
      console.log(`"${num}" was appended to file!`);
    });
  })
}

module.exports = persistTweetIds