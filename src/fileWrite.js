const fs = require('fs')

let numArray = [12345, 678910, 75723874986]
let stringArray = ["wefiuwwuenfwef", "2345876234523", "krsfbsfsdfg"]

numArray.forEach(num => {
  fs.appendFile('message.txt', num + "\n", (err) => {
    if (err) throw err;
    console.log(`"${num}" was appended to file!`);
  });
})

// fs.appendFile('message.txt', 'data to append', (err) => {
//   if (err) throw err;
//   console.log('The "data to append" was appended to file!');
// });