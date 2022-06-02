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
    const { id } = req.params;

    const shopping = await Shopping.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!shopping)
      return res.status(404).json({
        status: "error",
        message: "Can't find record data with that id!",
      });

    const shoppingBody = req.body?.shopping;

    if (!shoppingBody)
      return res.status(400).json({
        status: "error",
        message: "Invalid body request!",
      });

    const scheme = Joi.object({
      createddate: Joi.date().messages({
        "date.base": "Please insert correct date format!",
      }),
      name: Joi.string().messages({
        "string.base": "Shopping name must be a typee of string!",
      }),
    });

    const validation = scheme.validate(shoppingBody);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { name, createddate } = shoppingBody;
    await shopping.update({ name, createddate });

    res.status(201).json({
      data: shopping,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
