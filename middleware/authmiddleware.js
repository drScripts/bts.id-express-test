const { request, response } = require("express");
const { verifyJwtToken } = require("../helpers");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).json({
      status: "error",
      message: "UnAuthorized request!",
    });

  const token = authorization.split("Bearer ").pop();

  const payload = verifyJwtToken(token);

  if (!payload)
    return res.status(403).json({
      status: "error",
      message: "Invalid Jwt!",
    });

  req.user = payload;

  next();
};
