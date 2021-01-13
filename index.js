const { getUserTweets } = require('./src/tweets')
const savedIds = require('./src/savedIds')

getUserTweets(savedIds)