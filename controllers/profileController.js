// controllers/profileController.js
const User = require('../models/userModel');

exports.profile = async (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const user = await User.findOne({ email: req.session.user.email });
  res.send(`
    <h1>Profile Page</h1>
    <p>Username: ${user.username}</p>
    <p>Email: ${user.email}</p>
    <a href="/dashboard">Back to Dashboard</a><br>
    <a href="/logout">Logout</a>
  `);
};
