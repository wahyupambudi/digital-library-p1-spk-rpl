const express = require("express");
const router = express.Router();
const { Get, Insert, Update, Delete } = require("../controller/review.controller");
const { Authenticate, checkTokenBlacklist } = require("../middleware/restrict");


// router.get("/", Get);
// router.post("/", Insert);
// router.put("/:id", Update);
// router.delete("/:peminjaman_id", Delete);

module.exports = router;
