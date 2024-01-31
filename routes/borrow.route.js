const express = require("express");
const router = express.Router();
const { Get, Insert, Update, Delete } = require("../controller/borrow.controller");
const { Authenticate, checkTokenBlacklist } = require("../middleware/restrict");


router.get("/", Get);
router.post("/", Insert);
router.put("/:id", Update);
router.delete("/:peminjaman_id", Delete);

// Get Book Borrow
/**
 * @swagger
 * /api/v1/borrow-book:
 *   get:
 *     tags:
 *      - "CRUD Borrow Book"
 *     summary: Get all Borrow Book
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
 *                   peminjaman_id:
 *                     type: integer
 *                   userid:
 *                      type: integer
 *                   bukuid:
 *                      type: integer
 *                   tanggal_peminjaman:
 *                      type: string
 *                   tanggal_pengembalian:
 *                      type: string
 *                   status_peminjaman:
 *                      type: string
 */


// Post Book
/**
 * @swagger
 * /api/v1/borrow-book:
 *   post:
 *     tags:
 *      - "CRUD Borrow Book"
 *     summary: Create a new Borrow Book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               peminjaman_id:
 *                 type: integer
 *               userid:
 *                 type: integer
 *               bukuid:
 *                 type: integer
 *               tanggal_peminjaman:
 *                 type: string
 *               tanggal_pengembalian:
 *                 type: string
 *               status_peminjaman:
 *                 type: string
 *           example:
 *              peminjaman_id: 1
 *              userid: 2
 *              bukuid: 1
 *              tanggal_peminjaman: "2024-01-01"
 *              tanggal_pengembalian: "2024-01-10"
 *              status_peminjaman: "selesai"
 *     responses:
 *       200:
 *         description: Book created successfully
 *       400:
 *         description: Bad Request
 */


// Update Book
/**
 * @swagger
 * /api/v1/borrow-book/{id}:
 *   put:
 *     tags:
 *      - "CRUD Borrow Book"
 *     summary: Update an Borrow Book by ID
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
 *               peminjaman_id:
 *                 type: integer
 *               userid:
 *                 type: integer
 *               bukuid:
 *                 type: integer
 *               tanggal_peminjaman:
 *                 type: string
 *               tanggal_pengembalian:
 *                 type: string
 *               status_peminjaman:
 *                 type: string
 *           example:
 *              peminjaman_id: 1
 *              userid: 2
 *              bukuid: 1
 *              tanggal_peminjaman: "2024-01-01"
 *              tanggal_pengembalian: "2024-01-10"
 *              status_peminjaman: "selesai"
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
 * /api/v1/borrow-book/{id}:
 *   delete:
 *     tags:
 *      - "CRUD Borrow Book"
 *     summary: Delete an Borrow Book by ID
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
