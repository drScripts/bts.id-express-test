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
    const { id } = req.params;

    const shopping = await Shopping.findByPk(id);

    await shopping.delete();

    return res.status(201).json({
      data: {
        deletedId: id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
