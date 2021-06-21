const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/../.env' })
const { formattedTweets } = require('./util')

const mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USR_FROM,
    pass: process.env.EMAIL_APP_PWD
  }
})

const sendMail = (tweets, emails) => {

  const mailOptions = {
    from: process.env.GMAIL_USR_FROM,
    bcc: emails,
    subject: `PhilaStreets Tweets`,
    text: formattedTweets(tweets)
  }

  mail.sendMail(mailOptions, (err, info) => {
    console.log(`Sending email with ${tweets.length} tweets.`)
    console.log(err ? err : `Email sent: ${info.response}`)
    console.log("====================================")
  })
}

module.exports = sendMail