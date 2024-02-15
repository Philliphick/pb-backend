// require('dotenv').config();

// const { expressjwt: jwt } = require('express-jwt');
// const jwksRsa = require('jwks-rsa');
// const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
// const audience = process.env.AUTH0_AUDIENCE || 'http://localhost:5001/api';

// exports.checkJwt =
//   jwt({
//     secret: jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`,
//     }),
//     audience: audience,
//     issuer: `${issuerBaseUrl}/`,
//     algorithms: ['RS256'],
//   });

const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE || 'http://localhost:5001/api';

exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: `${issuerBaseUrl}/`,
  algorithms: ['RS256'],
}).unless({ // This allows requests to certain routes to bypass authentication
  path: [
    '/api/newUser', // Add paths that don't require authentication here
    // Add other public routes here
  ]
});

// Middleware function to log request headers
exports.logHeaders = (req, res, next) => {
  console.log('Request Headers:', req.headers);
  next();
};


