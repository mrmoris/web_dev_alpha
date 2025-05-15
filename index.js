// // // function myStackpromise() {
// // //      return new Promise(function(myresolve){
// // //          myresolve("success");
// // //      });
// // // }
// // // let p;

// // // myStackpromise().then(function(value){
// // //     p = value
// // // });

// // // // 
// // // console.log(p)



// // function myStackpromise() {
// //   return new Promise(function(myresolve){
      
// //       console.log("processing...");
// //       setTimeout(() =>{ ondone()
// //         myresolve("success");
// //       }, 5000);
// //   });
// // }

// // let resolvedValue; // Declare a variable to store the resolved value

// // ondone = () => {
// //   console.log("ddddd");
// // };

// // ondone1 = (value) => {
// //   console.log(value);
// // };

// // myStackpromise().then(ondone1);

// // // console.log(resolvedValue)



// let pms = new Promise(function(resolve){
//   resolve("success")
// })

// async function myfun(){
//     let p = await pms;
//     console.log(p);
// }
// myfun();


const express = require('express');
const app = express();

app.get('/', function(req, res){
  res.send('Hello World');
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
})