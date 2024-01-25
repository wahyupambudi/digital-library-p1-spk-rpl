const { ResponseTemplate, ResGet } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Get(req, res) {
  const { kategori_buku_id, bukuid, kategoriid } = req.query;
  const payload = {};

  if (kategori_buku_id) {
    payload.kategori_buku_id = parseInt(kategori_buku_id);
  }

  if (bukuid) {
    payload.bukuid = parseInt(bukuid);
  }

  if (kategoriid) {
    payload.kategoriid = parseInt(kategoriid);
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const resultCount = await prisma.Kategori_buku_relasi.count({
      where: {
        deletedAt: null,
      },
    });
    const totalPage = Math.ceil(resultCount / perPage);
    const skip = (page - 1) * perPage;
    const categories = await prisma.Kategori_buku_relasi.findMany({
      skip,
      take: perPage,
      where: {
        kategori_buku_id: payload.kategori_buku_id,
        bukuid: payload.bukuid,
        kategoriid: payload.kategoriid,
        deletedAt: null,
      },
      select: {
        id: true,
        kategori_buku_id: true,
        bukuid: true,
        kategoriid: true,
      },
    });

    let resp = ResGet(
      200,
      "success",
      null,
      page,
      totalPage,
      resultCount,
      categories,
    );
    res.json(resp);
    return;
  } catch (error) {
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Insert(req, res) {
  const { kategori_buku_id, kategoriid, bukuid } = req.body;

  const payload = {
    kategori_buku_id,
    kategoriid,
    bukuid,
  };

  if (!kategori_buku_id || !kategoriid || !bukuid) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const checkRelationCategory = await prisma.Kategori_buku_relasi.findUnique({
      where: {
        kategori_buku_id,
      },
    });

    if (checkRelationCategory) {
      let resp = ResponseTemplate(
        null,
        "Id Kategori Relation already used",
        null,
        400,
      );
      res.status(400).json(resp);
      return;
    }

    const categories = await prisma.Kategori_buku_relasi.create({
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

async function Update(req, res) {
  const { kategori_buku_id, kategoriid, bukuid } = req.body;
  const { id } = req.params;
  const updatedAt = new Date();

  // get relation
  const getCategories = await prisma.Kategori_buku_relasi.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!getCategories) {
    let resp = ResponseTemplate(null, "Data Not Found", null, 404);
    res.status(404).json(resp);
    return;
  }

  const payload = {
    kategori_buku_id,
    bukuid,
    kategoriid
  };

  // if (kategori_buku_id) {
  //   payload.kategori_buku_id = parseInt(kategori_buku_id);
  // }

  // if (bukuid) {
  //   payload.bukuid = parseInt(bukuid);
  // }

  // if (kategoriid) {
  //   payload.kategoriid = parseInt(kategoriid);
  // }

  if (!kategori_buku_id || !kategoriid || !bukuid) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const getRelationCategories = await prisma.Kategori_buku_relasi.update({
      where: {
        id: parseInt(id),
      },
      data: payload,
    });
    let resp = ResponseTemplate(getRelationCategories, "success", null, 200);
    res.json(resp);
    return;
  } catch (error) {
    // statements
    console.log(error);
    if (error.code === "P2002") {
      let resp = ResponseTemplate(null, "Id Kategori Relasi already used", null, 500);
      res.status(500).json(resp);
      return;
    } else if (error.code === "P2003") {
      let resp = ResponseTemplate(null, "Data Id Not Found", null, 500);
      res.status(500).json(resp);
      return;
    }
  }
}

async function Delete(req, res) {
  const { kategori_buku_id } = req.params;
  const deletedAt = new Date();

  const categoriesRelation = await prisma.Kategori_buku_relasi.findUnique({
    where: {
      kategori_buku_id: parseInt(kategori_buku_id),
    },
  });

  if (!categoriesRelation) {
    let resp = ResponseTemplate(null, "Data Not Found", null, 404);
    res.status(404).json(resp);
    return;
  }

  try {
    const updateRelation = await prisma.Kategori_buku_relasi.update({
      where: {
        kategori_buku_id: parseInt(kategori_buku_id),
      },
      data: {
        // unique value for soft delete
        kategori_buku_id: parseInt(
          -`${categoriesRelation.id}${kategori_buku_id}`,
        ),
        deletedAt,
      },
    });
    let resp = ResponseTemplate(updateRelation, "success", null, 202);
    res.json(resp);
    return;
  } catch (error) {
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", null, 500);
    res.status(500).json(resp);
    return;
  }
}

module.exports = { Get, Insert, Update, Delete };
