// controllers/dashboardController.js
exports.dashboard = (req, res) => {
    // Check if the user is logged in
    if (!req.session.user) {
      return res.redirect('/login');
    }
  
    res.send(`
      <h1>Welcome to your Dashboard, ${req.session.user.username}</h1>
      <a href="/profile">Go to Profile</a><br>
      <a href="/logout">Logout</a>
    `);
  };
  