const fs = require("fs");

function onDone(data) {
  console.log(data);
}

fs.readFile("a.txt", 'utf8', onDone);

// for(let i = 0; i < 10000000000; i++){
//   console.log(i)
// }
