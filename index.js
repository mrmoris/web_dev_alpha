function myStackpromise() {
     let pms = new Promise(function(myresolve){
         myresolve("success");
     });
}

myStackpromise.then(function(value){
    console.log(value);
},function(error){
    console.log(error);
})
// console.log(p)

