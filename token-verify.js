const jwt = require('jsonwebtoken');

// lo que vamos a utilizar para firmar.
// es lo que va a encriptar el header y el payload
const secret = 'mypassword';

// el payload es lo que vamos a encriptar dentro de ese token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI5NTA2NjQ2fQ.CoO_SvwHLxMhc-Eg3mELYoORPKDYOQg5TAlNfGuG5nU';


const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

const tokenVerified = verifyToken(token, secret);

console.log(tokenVerified);
