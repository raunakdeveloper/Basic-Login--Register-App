const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const signupController = require('../controllers/signupController');  // Ensure this path is correct
const loginController = require('../controllers/loginController');
const dashboardController = require('../controllers/dashboardController');
const profileController = require('../controllers/profileController');
const logoutController = require('../controllers/logoutController');
const { redirectIfAuthenticated } = require('../middlewares/authMiddleware');

// Home Route
router.get('/home', homeController.home); // welcome page route

// Signup Routes
router.get('/signup', redirectIfAuthenticated ,signupController.signup); // Render signup form
router.post('/signup', signupController.signupPost); // Handle signup form submission

// Login Routes
router.get('/login',redirectIfAuthenticated, loginController.login); // Login page
router.post('/login', loginController.loginPost); // Handle login

// Dashboard Route
router.get('/dashboard', dashboardController.dashboard); // Dashboard page

// Profile Route
router.get('/profile', profileController.profile); // User profile page

// Logout Route
router.get('/logout', logoutController.logout); // Logout and clear session

module.exports = router;
