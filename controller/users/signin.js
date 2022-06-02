const { request, response } = require("express");
const Joi = require("joi");
const { User } = require("../../models");
const { compareSync } = require("bcrypt");
const { getJwtToken } = require("../../helpers");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      email: Joi.string().email().required().messages({
        "string.base": "User email must be a type of string",
        "string.email": "User email must be an active email!",
        "any.required": "Please insert user email!",
      }),
      password: Joi.string().required().messages({
        "any.required": "Please insert user password!",
        "string.base": "Please inser user password!",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password!",
      });

    const validatePassword = compareSync(password, user.password);

    if (!validatePassword)
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password!",
      });

    const token = getJwtToken({ email: user.email, username: user.username });

    return res.status(200).json({
      email,
      token,
      username: user.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
