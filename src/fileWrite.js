const fs = require('fs')

const persistTweetIds = tweets => {
  const ids = tweets.map(tweet => tweet.id)
  ids.forEach(num => {
    fs.appendFileSync(`${process.cwd()}/db/ids.txt`, num + ",", (err) => {
      if (err) throw err;
      console.log(`"${num}" was appended to file!`);
    });
  })
}

module.persistTweetIds = persistTweetIds