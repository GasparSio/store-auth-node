const jwt = require('jsonwebtoken');

// lo que vamos a utilizar para firmar.
// es lo que va a encriptar el header y el payload
const secret = 'mypassword';

// el payload es lo que vamos a encriptar dentro de ese token
const payload = {
    sub: '1234567890', //la identificación del usuario
    role: 'admin' //rol del usuario
};

const signToken = (payload, secret) => {
    return jwt.sign(payload, secret);
};

const token = signToken(payload, secret);

console.log(token);
