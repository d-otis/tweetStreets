const formattedTweets = tweetArr => {
  let body = ''
  for (const tweet of tweetArr) {
    body = body.concat(formatDate(tweet.created_at) + "\r\n" + tweet.text + "\r\n\r\n")
  }
  return body
}

const formatDate = rawDate => {
  const dateObj = new Date(rawDate)
  const formattedDate = dateObj.toDateString()
  return formattedDate
}

module.exports = { formattedTweets }