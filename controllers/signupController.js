const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Handle the GET request for signup page
exports.signup = (req, res) => {
  res.send(`
    <h1>Signup Page</h1>
    <form action="/signup" method="POST">
      <input type="text" name="username" placeholder="Username" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Signup</button>
    </form>
    <p>If you have an account, please <a href="/login">login</a>.</p>
  `);
};

// Handle the POST request for signup (user registration logic)
exports.signupPost = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Simple validation for empty fields
    if (!username || !email || !password) {
      return res.status(400).send('All fields are required');
    }

    // Check if the email already exists (since email must be unique)
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).send('Email already in use');
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isLoggedIn: false, // Set isLoggedIn to false by default
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success message
    res.send(`
      <h1>Registration Successful</h1>
      <p>You can now <a href="/login">login</a>.</p>
    `);

  } catch (error) {
    console.error('Error during signup:', error);
    // Check for duplicate key errors (MongoDB E11000 error code)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).send(`${field} already exists`);
    }
    res.status(500).send('Server Error');
  }
};
