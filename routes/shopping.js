const {
  list,
  show,
  update,
  destroy,
  create,
} = require("../controller/shopping");
const router = require("express").Router();

router.get("/", list);
router.post("/", create);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
