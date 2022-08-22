# Tweet Streets

## Overview

I made a NodeJS app that emails, or texts, me anytime a tweet from PhilaStreets included the terms: suspend, collection, resume, delay.

## Todo

- clean up TwilioSMS branch + merge with main
- handle not connecting to twitter error better with timestamp
- modularize test conditions for tweet inclusion
- make it live so you can sign up for the service? (needs diagrams, API endpoints, etc)
- only grab emails in the event of tweets
- don't let retweets come through!
- fix this so that it says sent email at least
- Wed Sep 01 2021 12:59:01 GMT+0000 (Coordinated Universal Time) - Started
  Wed Sep 01 2021 12:59:04 GMT+0000 (Coordinated Universal Time) - Retrieving Tweets
  Wed Sep 01 2021 12:59:07 GMT+0000 (Coordinated Universal Time) - 250 2.0.0 OK 1630501147 d6sm9179965qkn.119 - gsmtp
  {
  body: [
  {
  created_at: '2021-09-01T11:13:41.000Z',
  text: 'As the rain storms move across the area the Streets Department will be working to collect trash and recycling materials. Residents should set materials out on regular day but expect delays as crews navigate through the expected heavy rain and possible flooding on roads. https://t.co/Y4PXOVcyq9',
  id: '1433025263441416192',
  author_id: '117424097'
  }
  ]
  }
