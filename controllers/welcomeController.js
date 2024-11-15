exports.welcome = (req, res) => {
  res.send(`
    <h1>Welcome to Our App!</h1>
    <a href="/login">Login</a> | <a href="/signup">Sign Up</a>
  `);
};
