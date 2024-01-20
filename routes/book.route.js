const express = require("express");
const router = express.Router();
const { Get, Insert, Update, Delete } = require("../controller/book.controller");
const { Authenticate, checkTokenBlacklist } = require("../middleware/restrict");


router.get("/", Get);

router.post("/", Insert);

// router.get("/whoami", Authenticate, checkTokenBlacklist, whoami);

// router.post("/logout", Authenticate, logout);

module.exports = router;
