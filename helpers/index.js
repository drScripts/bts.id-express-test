const { sign, verify } = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const getJwtToken = (data) => {
  return sign(data, jwtSecret);
};

const verifyJwtToken = (token) => {
  try {
    return verify(token, jwtSecret);
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { getJwtToken, verifyJwtToken };
