const User = require('../models/userModel');

exports.logout = async (req, res) => {
    try {
        // Check if user session exists
        if (!req.session.user) {
            return res.redirect('/login');
        }

        // Fetch the user from the database
        const user = await User.findOne({ email: req.session.user.email });

        if (user) {
            // Set isLoggedIn to false
            user.isLoggedIn = false;
            await user.save();
        }

        // Destroy session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Failed to log out.');
            }

            res.redirect('/home'); // Redirect to login page
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during logout.');
    }
};
