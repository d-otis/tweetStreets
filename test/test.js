var assert = require('assert')
var { formatDate, formattedTweets } = require('../src/util')

describe('Array', function() {
  describe("#indexOf()", function () {
    it('should return -1 when the value is not present', function() {
      assert.strictEqual([1, 2, 3].indexOf(4), -1)
    })
  })
})

describe('formatDate()', function() {
  it('should return the properly formatted date', function() {
    const rawDate = "2020-12-18T13:35:03.000Z"
    assert.strictEqual(formatDate(rawDate), 'Fri Dec 18 2020')
  })
})

describe('formattedTweets()', function() {
  it('should return a string with proper formatting and date', function() {
    const tweets = [
      {
        author_id:'117424097',
        created_at:'2020-12-30T18:00:18.000Z',
        id:'1344342564380536835',
        text:"We are experiencing delays in trash and recycling collections in some areas. Please keep or place your materials at your designated collection location.  We thank you for your patience as crews work as quickly and safely as possible throughout the city. https://t.co/QQbiyCmnDz"
      },
      {
        author_id:'117424097',
        created_at:'2020-12-18T13:35:03.000Z',
        id:'1339927155740975104',
        text:"Collections resume today. No rear driveway collections due to the snow. Thursday's materials will be collected Friday. Friday's materials collected Saturday. https://t.co/LT5irdk2BO https://t.co/BgunGqQKVw"
      },
      {
        author_id:'117424097',
        created_at:'2020-12-17T19:25:03.000Z',
        id:'1339652849211469826',
        text:"Thursday collections suspended. Rear driveway collections suspended for Thursday and Friday routes. Set materials at the curb in front of your home. Collections are one day behind, with Thursday's materials collected Friday, Friday's collected on Saturday. https://t.co/E3XdEFkudL https://t.co/D1BZVhWoU6"
      }
    ]

    assert.strictEqual(typeof(formattedTweets(tweets)), 'string')
  })
})


