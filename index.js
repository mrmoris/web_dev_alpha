// function myStackpromise() {
//      return new Promise(function(myresolve){
//          myresolve("success");
//      });
// }
// let p;

// myStackpromise().then(function(value){
//     p = value
// });

// // 
// console.log(p)



function myStackpromise() {
  return new Promise(function(myresolve){
      myresolve("success");
  });
}

let resolvedValue; // Declare a variable to store the resolved value

ondone(value) => {
  console.log(value)
}

myStackpromise().then(ondone);

// console.log(resolvedValue)



