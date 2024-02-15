// const express = require('express');
// const authRoutes = express.Router();


// // Handle authentication routes
// authRoutes.get('/login', (req, res) => {
//     // Redirect to Auth0 login route
//     res.redirect('/login');
//   });
  
//   authRoutes.get('/logout', (req, res) => {
//     // Redirect to Auth0 logout route
//     res.redirect('/logout');
//   });
  
  
//   // Route to fetch user profile
//   authRoutes.get('/me', (req, res) => {
//     // Check if user is authenticated
//     if (req.isAuthenticated()) {
//       // Return user profile
//       res.json(req.oidc.user);
//     } else {
//       // Return unauthorized status if user is not authenticated
//       res.status(401).json({ message: 'Unauthorized' });
//     }
//   });
  
//   module.exports = authRoutes;