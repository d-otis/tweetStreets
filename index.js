const { getUserTweets } = require('./src/tweets')

const dateObj = new Date()
const date = {
  date: dateObj.toLocaleString().split(", ")[0],
  time: dateObj.toLocaleString().split(", ")[1],
}

console.log()
console.log(`${new Date()} - Started`)
getUserTweets()