const { getUserTweets } = require('./src/tweets')

console.log('script starting')
console.log()
// getUserTweets()
// setInterval(getUserTweets, 14400000)
setInterval(() => {
  let rawDate = Date.now()
  let date = new Date(rawDate)
  console.log(`Checked @ ${date.toString()}`)
  console.log()
  getUserTweets()
}, 30000)