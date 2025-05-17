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

// 

// const express = require('express');
// const app = express();
// const z = require('zod')
const express = require('express');
const { z } = require('zod');

const app = express();

// Define the Zod schema
const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
});

app.get('/login', function(req, res) {
  // Validate query parameters
  const result = loginSchema.safeParse(req.query);

  if (!result.success) {
    // Send validation errors
    return res.status(400).json({ errors: result.error.errors });
  }

  // If valid, proceed
  res.json({ message: "Login data is valid", data: result.data.email });
});

app.use(function(err, req, res, next){
    console.log("Internal server error");
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// https://f0016f64-52ad-435d-94f9-559d2bfda724-00-3o2trva6bzz6v.sisko.replit.dev//login?email=YourEmail@example.com&password=Password@123
