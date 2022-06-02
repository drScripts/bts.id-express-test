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

    if (!shopping)
      return res.status(404).json({
        status: "error",
        message: "Can't find record data with that id!",
      });

    await shopping.destroy();

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
