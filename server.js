// server.js
const express = require("express");
const connectDB = require("./config/db");
const session = require("express-session");

const app = express();

// Connect to the database
connectDB();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Import and use routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Home route
app.get("/", (req, res) => {
  res.send(`
    <p>Welcome! Explore the application by clicking the link below:</p>
    <br>
    <a href="/home">Go to Home</a>
  `);
});

// 404 route
app.get("*", (req, res) => {
  res.status(404).send(`Page not found <a href="/home">Go to Home</a>`);
});

// Export the Express app for Vercel to use
module.exports = app;
