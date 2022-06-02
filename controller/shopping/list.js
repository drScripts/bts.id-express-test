const { request, response } = require("express");
const { Shopping } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const shopping = await Shopping.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return res.send({
      data: shopping,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
