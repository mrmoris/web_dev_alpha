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

// 1. Import the express module
const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
// 2. Create an Express application
const app = express();
app.use(bodyParser.json());

// 3. Define a route for the homepage
app.get("/app/", (req, res) => {
  fs.readFile("b.txt", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.send(data.toString());
    }
  });
});


app.post("/app/", function (req, res) {
    let data = req.body;
    fs.appendFile("b.txt", '\n' +JSON.stringify(data), function (err) {
        if (err) {
            return res.status(500).send("Error saving data");
        }
        res.send("saved");
    });
});


app.delete("/app/", function (req, res) {
    const nameToDelete = req.body.name;
    if (!nameToDelete) {
        return res.status(400).send("No name provided");
    }

    fs.readFile("b.txt", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        // Split file into lines, filter out the one to delete
        const lines = data.split('\n').filter(line => {
            if (!line.trim()) return false; // skip empty lines
            try {
                const obj = JSON.parse(line);
                return obj.name !== nameToDelete;
            } catch {
                return true; // skip lines that aren't valid JSON
            }
        });

        // Join remaining lines and overwrite the file
        fs.writeFile("b.txt", lines.join('\n') + '\n', (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send("deleted");
        });
    });
});



app.delete("/app/", function (req, res) {
    const nameToDelete = req.body.name;
    if (!nameToDelete) {
        return res.status(400).send("No name provided");
    }

    fs.readFile("b.txt", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        // Split file into lines, filter out the one to delete
        const lines = data.split('\n').filter(line => {
            if (!line.trim()) return false; // skip empty lines
            try {
                const obj = JSON.parse(line);
                return obj.name !== nameToDelete;
            } catch {
                return true; // skip lines that aren't valid JSON
            }
        });

        // Join remaining lines and overwrite the file
        fs.writeFile("b.txt", lines.join('\n') + '\n', (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send("deleted");
        });
    });
});


app.put("/app/", function (req, res) {   //{"oldName": "newCharlie","name":"Alice","age":25}
    const oldName = req.body.oldName;
    const newName = req.body.name;
    const newAge = req.body.age;

    if (!oldName || !newName || !newAge) {
        return res.status(400).send("Missing fields (oldName, name, age)");
    }

    fs.readFile("b.txt", "utf8", function(err, data) {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        // Split file into lines and update the matching entry
        const lines = data.split('\n').filter(function(line) {
            return line.trim() !== "";
        });

        let updated = false;
        const updatedLines = lines.map(function(line) {
            try {
                const obj = JSON.parse(line);
                if (obj.name === oldName) {
                    obj.name = newName;
                    obj.age = newAge;
                    updated = true;
                    return JSON.stringify(obj);
                }
                return line;
            } catch (e) {
                return line; // If not valid JSON, leave as is
            }
        });

        if (!updated) {
            return res.status(404).send("Person not found");
        }

        fs.writeFile("b.txt", updatedLines.join('\n') + '\n', function(err) {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send("updated");
        });
    });
});






// 4. Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
