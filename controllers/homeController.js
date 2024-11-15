exports.home = (req, res) => {
  if (req.session && req.session.user) {
    res.send(`
      <h1>Welcome, ${req.session.user.username}!</h1>
      <div>
        <p>Happy to see you again!</p>
        <a href="/dashboard">Dashboard</a>
        <a href="/profile">Profile</a>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <h1>Home Page</h1>
      <div>
        <a href="/login">Login</a>&nbsp; &nbsp;
        <a href="/signup">Signup</a>
      </div>
    `);
  }
};
