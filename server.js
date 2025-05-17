
const express = require('express');
const app = express();

// Use a single JSON parser middleware
app.use(express.json());

app.get("/", function(req, res) {
    res.send("Hello, World!");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
