const should = require('should')
const { idsFromSheet, getEmailsFromSheet } = require('../src/googleSheets')

describe('googleSheets Module', function() {
  describe('idsFromSheet()', function() {
    it('should return array of tweet ids as Strings that saved in Google Sheets', async function() {
      const ids = await idsFromSheet()
    
      ids.should.be.instanceOf(Array)
      ids[0].should.have.length(19)
      ids[0].should.be.instanceOf(String)
    })
  })

  describe('getEmailsFromSheet', function() {
    xit('should retrieve the emails from the spreadsheet', async function() {
      const emails = await getEmailsFromSheet()

      emails.should.be.instanceOf(Array)
      emails[0].should.be.instanceOf(String)
    })
  })
})
