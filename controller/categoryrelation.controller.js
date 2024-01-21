const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function Insert(req, res) {
  const { bukuid, judul, penulis, penerbit, tahun_terbit } = req.body;

  const payload = {
    bukuid,
    judul,
    penulis,
    penerbit,
    tahun_terbit,
  };

  if (!bukuid || !judul || !penulis || !penerbit || !tahun_terbit) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const checkBukuId = await prisma.Buku.findUnique({
      where: {
        bukuid,
      },
    });

    if (checkBukuId) {
      let resp = ResponseTemplate(null, "Id Buku already used", null, 400);
      res.status(400).json(resp);
      return;
    }

    const books = await prisma.Buku.create({
      data: payload,
    });

    let resp = ResponseTemplate(books, "success", null, 200);
    res.json(resp);
  } catch (error) {
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", null, 500);
    res.status(500).json(resp);
    return;
  }
}

module.exports = {Insert}