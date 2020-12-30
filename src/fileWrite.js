const fs = require('fs')

let numArray = [12345, 678910, 75723874986]
let stringArray = ["wefiuwwuenfwef", "2345876234523", "krsfbsfsdfg"]


const persistTweetIds = ids => {
  ids.forEach(num => {
    fs.writeFileSync('/db/data.txt', num + ",", (err) => {
      if (err) throw err;
      console.log(`"${num}" was appended to file!`);
    });
  })
}

// persistTweetIds(numArray)

module.persistTweetIds = persistTweetIds