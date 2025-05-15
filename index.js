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


// const express = require('express');
// const app = express();


const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// In-memory todo storage
let todos = [];
let nextId = 1;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// API Endpoints
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const todo = { id: nextId++, title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  todo.completed = !todo.completed;
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.status(204).end();
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



