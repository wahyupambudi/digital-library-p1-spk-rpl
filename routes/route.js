const express = require("express");
const router = express.Router();
const authRoute = require("../routes/auth.route");
const bookRoute = require("../routes/book.route");
const morgan = require("morgan");

router.use(morgan("dev"));

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/book", bookRoute);

module.exports = router;
