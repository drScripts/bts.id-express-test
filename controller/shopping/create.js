const { request, response } = require("express");
const Joi = require("joi");
const { Shopping } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const shopping = req.body?.shopping;

    if (!shopping)
      return res.status(400).json({
        status: "error",
        message: "Invalid body request!",
      });

    const scheme = Joi.object({
      createddate: Joi.date().required().messages({
        "any.required": "Please insert shopping createddate",
        "date.base": "Please insert correct date format!",
      }),
      name: Joi.string().required().messages({
        "any.required": "Please insert shopping name!",
        "string.base": "Shopping name must be a typee of string!",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { name, createddate } = shopping;

    const shoppingCreated = await Shopping.create({ name, createddate });

    return res.status(201).json({
      data: shoppingCreated,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
