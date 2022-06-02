const {
  list,
  show,
  update,
  destroy,
  create,
} = require("../controller/shopping");
const Authmiddleware = require("../middleware/Authmiddleware");
const router = require("express").Router();

router.get("/", Authmiddleware, list);
router.post("/", create);
router.get("/:id", Authmiddleware, show);
router.put("/:id", update);
router.delete("/:id", Authmiddleware, destroy);

module.exports = router;
