const bcrypt = require('bcrypt');

async function hashPassword () {
  const password = 'password';
  //el bcrypt.hash() es una función asincrónica que recibe dos argumentos: la contraseña y el número de rondas de cifrado.
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
};
hashPassword();

//$2b$10$1EKmTzOfZpwcX/oeCwnV8ug9MrIsiPBx3hHjmo48pzNHopqCC.2QK

