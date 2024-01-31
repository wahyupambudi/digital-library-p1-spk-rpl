const express = require("express");
const router = express.Router();
const { Get, Insert, Update, Delete } = require("../controller/book.controller");
const { Authenticate, checkTokenBlacklist } = require("../middleware/restrict");


router.get("/", Get);
router.post("/", Insert);
router.put("/:id", Update);
router.delete("/:bukuid", Delete);


// Get Book
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
 *              judul: "title of book"
 *              penulis: "wahyup"
 *              penerbit: "erlangga"
 *              tahun_terbit: 2024
 *     responses:
 *       200:
 *         description: Book created successfully
 *       400:
 *         description: Bad Request
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
 *              judul: "title of book"
 *              penulis: "wahyup"
 *              penerbit: "erlangga"
 *              tahun_terbit: 2024
 *     responses:
 *       200:
 *         description: Book Updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Book Not Found 
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
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Book Not Found 
 */

module.exports = router;
