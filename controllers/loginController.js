// controllers/loginController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Display the login form (GET request)
exports.login = (req, res) => {
  res.send(`
    <h1>Login Page</h1>
    <form action="/login" method="post">
      <label>Email:</label>
      <input type="email" name="email" required /><br>
      <label>Password:</label>
      <input type="password" name="password" required /><br>
      <p>if you have not account ? Please register <a href="/signup">register</a>.</p>
      <button type="submit">Login</button>
    </form>
  `);
};

// Handle login logic (POST request)
exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  // Find user in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('User not found');
  }

  // Compare password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid credentials');
  }

  // Update isLoggedIn to true when logging in
  user.isLoggedIn = true;
  await user.save();  // Save the updated user to the database

  // Store the user in session
  req.session.user = {
    username: user.username,
    email: user.email,
  };

  res.redirect('/dashboard'); // Redirect to dashboard after login
};
