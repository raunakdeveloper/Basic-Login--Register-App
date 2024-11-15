// server.js
const express = require("express");
const connectDB = require("./config/db");
const session = require("express-session");
const app = express();

connectDB();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session setup
app.use(
  session({
    secret: "raunakkaushal",
    resave: false,
    saveUninitialized: true,
  })
);

// Import and use routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.get("/", (req, res) => {
  res.send(`
    <p>Welcome! Explore the application by clicking the link below:</p>
    <br>
    <a href="/home">Go to Home</a>
  `);
});

app.get("*" , (req, res) => {
  res.status(404).send(`Page not found <a href="/home">Go to Home</a>`);
});

// Start the server
port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
