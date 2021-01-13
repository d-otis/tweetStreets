const { getUserTweets } = require('./src/tweets')
const savedIds = require('./src/savedIds')

console.log('script starting')
console.log()
// initial fetch
getUserTweets()

let rawDate = Date.now()
let date = new Date(rawDate)

console.log(`Checked @ ${date.toString()}`)
console.log()
console.log('done')
console.log()
console.log('==================================')
