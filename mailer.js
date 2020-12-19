const nodemailer = require('nodemailer')
// const dotenv = require('dotenv').config();
const dotenvMe = require('./env.util')

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
      console.log(`Checking tweet# ${tweet.id}`)
      if (!mailedTweets.includes(tweet.id)) {
        body = body.concat(tweet.created_at + "\r\n" + tweet.text + "\r\n\r\n")
        mailedTweets.push(tweet.id)
      }
    }
    return body
  }

mail.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Email sent: ' + info.response)
  }
})