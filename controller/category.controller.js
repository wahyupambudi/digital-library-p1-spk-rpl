const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Insert(req, res) {
  const { kategoriid, nama_kategori } = req.body;

  const payload = {
    kategoriid,
    nama_kategori,
  };

  if (!kategoriid || !nama_kategori) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const checkKategoriId = await prisma.Kategoribuku.findUnique({
      where: {
        kategoriid,
      },
    });

    if (checkKategoriId) {
      let resp = ResponseTemplate(null, "Id Kategori already used", null, 400);
      res.status(400).json(resp);
      return;
    }

    const categories = await prisma.Kategoribuku.create({
      data: payload,
    });

    let resp = ResponseTemplate(categories, "success", null, 200);
    res.json(resp);
  } catch (error) {
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", null, 500);
    res.status(500).json(resp);
    return;
  }
}

module.exports = { Insert };
