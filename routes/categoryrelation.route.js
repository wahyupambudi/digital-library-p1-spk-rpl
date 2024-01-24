const express = require("express");
const router = express.Router();
const { Get, Insert, Update, Delete } = require("../controller/categoryrelation.controller");
const { Authenticate, checkTokenBlacklist } = require("../middleware/restrict");


router.get("/", Get);
router.post("/", Insert);
// router.put("/:id", Update);
// router.delete("/:bukuid", Delete);

module.exports = router;
