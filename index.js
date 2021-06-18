const { getUserTweets } = require('./src/tweets')
// const savedIds = require('./src/savedIds')
const { idsFromSheet } = require('./src/googleSheets')

const dateObj = new Date()
const date = {
  date: dateObj.toLocaleString().split(", ")[0],
  time: dateObj.toLocaleString().split(", ")[1],
}
console.log()
console.log()
console.log("====================================")
console.log("===Checking PhilaStreets' Twitter===")
console.log(`=====${date.date} @ ${date.time}====`)
console.log("====================================")
getUserTweets(idsFromSheet)