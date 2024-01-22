const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Get(req, res) {
  const { kategoriid, nama_kategori } = req.query;
  const payload = {};

  if (kategoriid) {
    payload.kategoriid = parseInt(kategoriid);
  }

  if (nama_kategori) {
    payload.nama_kategori = nama_kategori;
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;
    const categories = await prisma.Kategoribuku.findMany({
      skip,
      take: perPage,
      where: {
        kategoriid: payload.kategoriid,
        nama_kategori: {
          contains: nama_kategori,
          mode: "insensitive",
        },
        deletedAt: null,
      },
      select: {
        id: true,
        kategoriid: true,
        nama_kategori: true
      },
    });

    let resp = ResponseTemplate(categories, "success", null, 200);
    res.json(resp);
    return;
  } catch (error) {
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.json(resp);
    return;
  }
}

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

async function Delete(req, res) {
  const {kategoriid} = req.params;
  const deletedAt = new Date();

  const categoriesBook = await prisma.Kategoribuku.findUnique({
    where: {
      kategoriid: parseInt(kategoriid)
    }
  })

  if(!categoriesBook) {
    let resp = ResponseTemplate(null, "Kategoribuku is Not Found", null, 404)
    res.status(404).json(resp)
    return;
  }

  try {
    const categories = await prisma.Kategoribuku.update({
      where: {
        kategoriid: parseInt(kategoriid),
      }, 
      data: {
        // unique value for soft delete
        kategoriid: parseInt(-`${categoriesBook.id}${kategoriid}`),
        deletedAt
      }
    })
    let resp = ResponseTemplate(categories, "success", null, 202);
    res.json(resp)
    return;
  } catch(error) {
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", null, 500);
    res.status(500).json(resp);
    return;
  }

}

module.exports = {Get, Insert, Delete};
