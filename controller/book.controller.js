const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Get(req, res) {
  const { bukuid, judul, penulis, penerbit, tahun_terbit } = req.body;

  const payload = {
    bukuid,
    judul,
    penulis,
    penerbit,
    tahun_terbit,
  };

  try {
    const books = await prisma.Book.create({
      data: payload,
    });
    let resp = ResponseTemplate(books, "success", null, 200);
    res.json(resp);
  } catch (error) {
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", null, 500);
    res.json(resp);
    return;
  }
}

async function Insert(req, res) {
  const { bukuid, judul, penulis, penerbit, tahun_terbit } = req.body;
}

async function Update(req, res) {
  const { bukuid, judul, penulis, penerbit, tahun_terbit } = req.body;
}

async function Delete(req, res) {
  const { bukuid, judul, penulis, penerbit, tahun_terbit } = req.body;
}

module.exports = { Get, Insert, Update, Delete };
