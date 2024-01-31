const express = require("express");
const router = express.Router();
const { Get, Insert, Update, Delete } = require("../controller/category.controller");
const { Authenticate, checkTokenBlacklist } = require("../middleware/restrict");


router.get("/", Get);
router.post("/", Insert);
router.put("/:id", Update);
router.delete("/:kategoriid", Delete);


// Get Category
/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     tags:
 *      - "CRUD Category"
 *     summary: Get all Category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   kategoriid:
 *                     type: integer
 *                   nama_kategori:
 *                      type: string
 */


// Post Category
/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     tags:
 *      - "CRUD Category"
 *     summary: Create a new Category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kategoriid:
 *                 type: integer
 *               nama_kategori:
 *                 type: string
 *           example:
 *              kategoriid: 1
 *              nama_kategori: "technolgy"
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Bad Request
 */


// Update Category
/**
 * @swagger
 * /api/v1/category/{id}:
 *   put:
 *     tags:
 *      - "CRUD Category"
 *     summary: Update an Category by ID
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
 *              judul: "title of Category"
 *              penulis: "wahyup"
 *              penerbit: "erlangga"
 *              tahun_terbit: 2024
 *     responses:
 *       200:
 *         description: Category Updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Category Not Found 
 */

// Delete
/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     tags:
 *      - "CRUD Category"
 *     summary: Delete an Category by ID
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
 *         description: Category deleted successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Category Not Found 
 */

module.exports = router;
