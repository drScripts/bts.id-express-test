const { request, response } = require("express");
const Joi = require("joi");
const { User } = require("../../models");
const { hashSync } = require("bcrypt");
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
      username: Joi.string().required().messages({
        "string.base": "User username must be a type of string",
        "any.required": "Please insert user username",
      }),
      email: Joi.string().email().required().messages({
        "any.required": "Please insert User email!",
        "string.base": "User email must be a type of string",
        "string.email": "User email must be a valid email!",
      }),
      encrypted_password: Joi.string().min(8).required().messages({
        "string.base": "User password must be a type of string",
        "any.required": "Please insert user passsword!",
        "string.min":
          "User password length must be greather or equal than 8 character",
      }),
      phone: Joi.string().required().messages({
        "string.base": "User phone number must be a type of string",
        "any.required": "Please insert user phone number!",
      }),
      address: Joi.string().required().messages({
        "any.required": "Please insert user address!",
        "string.base": "User address must be a type of string",
      }),
      city: Joi.string().required().messages({
        "any.required": "Please insert user city!",
        "string.base": "User city must be a type of string",
      }),
      country: Joi.string().required().messages({
        "any.required": "Please insert user country!",
        "string.base": "User country must be a type of string",
      }),
      name: Joi.string().required().messages({
        "any.required": "Please insert user name!",
        "string.base": "User name must be a type of string",
      }),
      postcode: Joi.number().required().messages({
        "any.required": "Please insert user postcode!",
        "string.base": "User postcode must be a type of string",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const {
      name,
      username,
      email,
      postcode,
      country,
      city,
      address,
      phone,
      encrypted_password,
    } = req.body;

    const password = hashSync(encrypted_password, 10);

    await User.create({
      name,
      username,
      email,
      postcode,
      country,
      city,
      address,
      phone,
      password,
    });

    const token = getJwtToken({ email, username });

    return res.status(201).json({
      email,
      token,
      username,
    });
  } catch (err) {
    if (err?.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        status: "error",
        message: "Email already registered!",
      });
    }

    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
