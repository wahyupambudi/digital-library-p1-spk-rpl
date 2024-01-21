const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Get(req, res) {
  const { bukuid, judul, penulis, penerbit, tahun_terbit } = req.query;

  const payload = {};

  if (bukuid) {
    payload.bukuid = parseInt(bukuid);
  }

  if (judul) {
    payload.judul = judul;
  }

  if (penulis) {
    payload.penulis = penulis;
  }

  if (penerbit) {
    payload.penerbit = penerbit;
  }

  if (tahun_terbit) {
    payload.tahun_terbit = parseInt(tahun_terbit);
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;
    const books = await prisma.Buku.findMany({
      skip,
      take: perPage,
      where: {
        bukuid: payload.bukuid,
        judul: {
          contains: judul,
          mode: "insensitive",
        },
        penulis: {
          contains: penulis,
          mode: "insensitive",
        },
        penerbit: {
          contains: penerbit,
          mode: "insensitive",
        },
        tahun_terbit: payload.tahun_terbit,
        deletedAt: null,
      },
      select: {
        id: true,
        bukuid: true,
        judul: true,
        penulis: true,
        penerbit: true,
        tahun_terbit: true,
      },
    });

    let resp = ResponseTemplate(books, "success", null, 200);
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

async function Update(req, res) {
  const { bukuid, judul, penulis, penerbit, tahun_terbit } = req.body;
  const { id } = req.params;
  const updatedAt = new Date();

  // mendapatkan data buku
  const books = await prisma.Buku.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!books) {
    let resp = ResponseTemplate(null, "Buku is Not Found", null, 404);
    res.status(404).json(resp);
    return;
  }

  // menyimpan data terbaru
  const payload = {};

  if (bukuid) {
    payload.bukuid = parseInt(bukuid);
  }

  if (judul) {
    payload.judul = judul;
  }

  if (penulis) {
    payload.penulis = penulis;
  }

  if (penerbit) {
    payload.penerbit = penerbit;
  }

  if (tahun_terbit) {
    payload.tahun_terbit = parseInt(tahun_terbit);
  }

  if (!bukuid || !judul || !penulis || !penerbit || !tahun_terbit) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const books = await prisma.Buku.update({
      where: {
        id: parseInt(id),
      },
      data: payload,
    });

    let resp = ResponseTemplate(books, "success", null, 200);
    res.json(resp);
    return;
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") {
      let resp = ResponseTemplate(null, "Id Buku already used", null, 500);
      res.status(500).json(resp);
      return;
    }
  }
}

async function Delete(req, res) {
  const { bukuid } = req.params;

  const books = await prisma.Buku.findUnique({
    where: {
      bukuid: parseInt(bukuid),
    },
  });

  if (!books) {
    let resp = ResponseTemplate(null, "Buku is Not Found", null, 404);
    // res.json(resp);
    res.status(404).json(resp);
    return;
  }

  try {
    const books = await prisma.Buku.delete({
      where: {
        bukuid: parseInt(bukuid),
      },
    });

    let resp = ResponseTemplate(books, "success", null, 200);
    res.json(resp);
    return;
  } catch (error) {
    // statements
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

module.exports = { Get, Insert, Update, Delete };
