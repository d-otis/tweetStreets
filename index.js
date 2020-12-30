const { getUserTweets } = require('./src/tweets')
const { getStore, anArray } = require('./src/getStore')
// let savedTweetIds = getStore()

console.log('script starting')
console.log()
// initial fetch
getUserTweets()
let rawDate = Date.now()
let date = new Date(rawDate)
console.log(`Checked @ ${date.toString()}`)
console.log()
console.log('done')