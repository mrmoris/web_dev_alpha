const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(express.json());  // middleware

app.get("/", function(req, res) {
    res.send("Hello, World!");
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
