const fs = require('fs');
const path = require('path')

const processData = data => {
  return data.substr(0, data.length - 1).split(",")
}

const data = fs.readFileSync(`${path.join(__dirname, '..')}/db/ids.txt`, 'utf-8', (err, data) => {
    if (data) console.log(data)
    console.log('inside readFile')
    processData(data)
  })

const savedIds = processData(data)

module.exports = savedIds