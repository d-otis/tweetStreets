const fs = require('fs');

let arr

const getStore = () => {

  fs.readFile(`${process.cwd()}/src/data.txt`, 'utf8', (err, data) => {
    console.log('inside file read');
    if (err)
      throw err;
    console.log(err);
    data = data.substr(0, data.length - 1);
    arr = data.split(',');
  });
  console.log(arr)
  return arr;
}

const anArray = () => [1,2,3,4]
console.log(anArray())
console.log(getStore())
// getStore()

// module.exports = function() {
//   console.log('howdy partner')
//   return "i've been returned"
// }

// console.log()
// console.log(getStore())
// module.getStore = getStore
// exports.getStore = () => getStore()
// exports.getStore = getStore


// this works with 
// const { retArr } = require('./src/getStore)
// as the import/require statement
// module.exports.retArr = async () => {
//   await retArr()
// }

module.exports = { getStore, anArray }