const express = require("express");
const router = express.Router();
const { Register, Login, whoami, logout } = require("../controller/auth.controller");
const { Authenticate, checkTokenBlacklist } = require("../middleware/restrict");


// Register
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *      - "Authentication"
 *     summary: Register User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Register successfully
 */
router.post("/register", Register);

// Login
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *      - "Authentication"
 *     summary: Login User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login successfully
 */
router.post("/login", Login);


// Get Whoami
/**
 * @swagger
 * /api/v1/auth/whoami:
 *   get:
 *     tags:
 *      - "Authentication"
 *     summary: Check User Session
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                      type: string
 */
router.get("/whoami", Authenticate, checkTokenBlacklist, whoami);

// Logout
/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *      - "Authentication"
 *     summary: Logout User Session
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post("/logout", Authenticate, logout);

module.exports = router;
