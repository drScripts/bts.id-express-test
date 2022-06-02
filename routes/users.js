const router = require("express").Router();
const { signup, signin, list } = require("../controller/users");

/* GET users listing. */
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/", list);

module.exports = router;
