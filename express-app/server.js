// server.js
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

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
    fs.appendFile("b.txt", "\n" + JSON.stringify(data), function (err) {
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

        const lines = data.split("\n").filter((line) => {
            if (!line.trim()) return false;
            try {
                const obj = JSON.parse(line);
                return obj.name !== nameToDelete;
            } catch {
                return true;
            }
        });

        fs.writeFile("b.txt", lines.join("\n") + "\n", (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send("deleted");
        });
    });
});

app.put("/app/", function (req, res) {
    const oldName = req.body.oldName;
    const newName = req.body.name;
    const newAge = req.body.age;

    if (!oldName || !newName || !newAge) {
        return res.status(400).send("Missing fields (oldName, name, age)");
    }

    fs.readFile("b.txt", "utf8", function (err, data) {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        const lines = data.split("\n").filter(function (line) {
            return line.trim() !== "";
        });

        let updated = false;
        const updatedLines = lines.map(function (line) {
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
                return line;
            }
        });

        if (!updated) {
            return res.status(404).send("Person not found");
        }

        fs.writeFile("b.txt", updatedLines.join("\n") + "\n", function (err) {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send("updated");
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
