// Import dependencies
const express = require("express");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const jwtPassword = "supersecretkey"; // You can change this to something more secure

// Initialize express app
const app = express();
app.use(express.json());

// Sample in-memory users database (feel free to replace with a real database)
const ALL_USERS = [
  { username: "harkirat@gmail.com", password: "123", name: "Harkirat Singh" },
  { username: "raman@gmail.com", password: "123321", name: "Raman Singh" },
  { username: "priya@gmail.com", password: "123321", name: "Priya Kumari" },
];

// Check if a user exists with the given username and password
function userExists(username, password) {
  return ALL_USERS.some(
    (user) => user.username === username && user.password === password,
  );
}

// POST: Sign in (this will issue a JWT token for valid users)
app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!userExists(username, password)) {
    return res.status(403).json({ msg: "Invalid username or password" });
  }

  // Create a JWT token (payload contains username)
  const token = jwt.sign({ username }, jwtPassword, { expiresIn: "1" });

  // Return the token to the user
  res.json({ token });
});

// GET: Users (this route is protected, it requires a valid JWT token)
app.get("/users", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ msg: "Token missing" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtPassword);

    // Extract the username from the decoded token
    const username = decoded.username;

    // Return all users except the logged-in user
    const users = ALL_USERS.filter((user) => user.username !== username);
    return res.json(users);
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
