var assert = require('assert')
var { formatDate, formattedTweets } = require('../src/util')

describe('Array', function() {
  describe("#indexOf()", function () {
    it('should return -1 when the valie is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})