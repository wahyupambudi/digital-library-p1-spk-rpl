const express = require("express");
const router = express.Router();
const { Get, Insert, Update, Delete } = require("../controller/book.controller");
const { Authenticate, checkTokenBlacklist } = require("../middleware/restrict");


router.get("/", Get);
router.post("/", Insert);
router.put("/:id", Update);
router.delete("/:bukuid", Delete);


// Get Todolist
/**
 * @swagger
 * /api/v1/book:
 *   get:
 *     tags:
 *      - "CRUD Book"
 *     summary: Get all Book
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Book
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   bukuid:
 *                     type: integer
 *                   judul:
 *                      type: string
 *                   penulis:
 *                      type: string
 *                   penerbit:
 *                      type: string
 *                   tahun_terbit:
 *                      type: integer
 */


// Post Book
/**
 * @swagger
 * /api/v1/book:
 *   post:
 *     tags:
 *      - "CRUD Book"
 *     summary: Create a new Book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bukuid:
 *                 type: integer
 *               judul:
 *                 type: string
 *               penulis:
 *                 type: string
 *               penerbit:
 *                 type: string
 *               tahun_terbit:
 *                 type: integer
 *           example:
 *              bukuid: 1
 *     responses:
 *       201:
 *         description: Book created successfully
 */


// Update Book
/**
 * @swagger
 * /api/v1/book/{id}:
 *   put:
 *     tags:
 *      - "CRUD Book"
 *     summary: Update an Book by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *               description:
 *                 type: string
 *               start:
 *                 type: string
 *                 format: date-time
 *               finish:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 */

// Delete
/**
 * @swagger
 * /api/v1/book/{id}:
 *   delete:
 *     tags:
 *      - "CRUD Book"
 *     summary: Delete an Book by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Book deleted successfully
 */

module.exports = router;
