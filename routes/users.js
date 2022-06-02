const router = require("express").Router();
const { signup, signin, list } = require("../controller/users");
const Authmiddleware = require("../middleware/Authmiddleware");

/* GET users listing. */
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/", Authmiddleware, list);

module.exports = router;
