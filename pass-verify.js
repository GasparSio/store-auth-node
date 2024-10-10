const bcrypt = require('bcrypt');

async function verifyPassword() {
  const password = 'password';
  const hash = '$2b$10$1EKmTzOfZpwcX/oeCwnV8ug9MrIsiPBx3hHjmo48pzNHopqCC.2QK';
  const result = await bcrypt.compare(password, hash);
  console.log(result);
};

verifyPassword();//true
