require("dotenv").config();

module.exports = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USERNAME,
  dbPass: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbDialect: process.env.DB_DIALECT,
  jwtSecret: process.env.JWT_SECRET,
};
