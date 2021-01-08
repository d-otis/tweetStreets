const fs = require('fs')

const persistTweetIds = ids => {
  ids.forEach(num => {
    fs.writeFile('/db/data.txt', num + ",", (err) => {
      if (err) throw err;
      console.log(`"${num}" was appended to file!`);
    });
  })
}

module.persistTweetIds = persistTweetIds