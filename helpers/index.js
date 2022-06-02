const { sign } = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const getJwtToken = (data) => {
  return sign(data, jwtSecret);
};

module.exports = { getJwtToken };
