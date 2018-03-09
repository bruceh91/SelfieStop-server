import bcrypt from "bcrypt";

const salts = 12;

function makeHash(password) {
  return bcrypt.hash(password, salts);
}

function checkPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export { makeHash, checkPassword };