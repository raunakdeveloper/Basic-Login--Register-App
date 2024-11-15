// middlewares/authMiddleware.js

exports.redirectIfAuthenticated = (req, res, next) => {
    // Check if user is logged in by checking `req.session.user`
    if (req.session && req.session.user) {
        // User is logged in, redirect to /profile
        return res.redirect('/profile');
    }
    // User is not logged in, proceed to the next middleware or route handler
    next();
};
