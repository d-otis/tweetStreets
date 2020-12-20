const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config();

const mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USR_FROM,
    pass: process.env.EMAIL_APP_PWD
  }
})

const sendMail = tweets => {
  const formattedTweets = tweetArr => {
    let body = ''
    for (const tweet of tweetArr) {
      body = body.concat(formatDate(tweet.created_at) + "\r\n" + tweet.text + "\r\n\r\n")
    }
    return body
  }

  const mailOptions = {
    from: process.env.GMAIL_USR_FROM,
    to: process.env.GMAIL_USR_TO,
    subject: `PhilaStreets Tweets`,
    text: formattedTweets(tweets)
  }

  mail.sendMail(mailOptions, (err, info) => {
    console.log(err ? err : `Email sent: ${info.response}`)
  })
}

const formatDate = rawDate => {
  const dateObj = new Date(rawDate)
  const splitDate = dateObj.toString().split(' ')
  const formattedDate = splitDate.slice(0,3).concat(splitDate.slice(4,5)).join(' ')
  return formattedDate
}

module.exports = sendMail