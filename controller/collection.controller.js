const { ResponseTemplate, ResGet } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Get(req, res) {
  const { koleksi_id, userid, bukuid } = req.query;
  const payload = {};

  if (koleksi_id) {
    payload.koleksi_id = parseInt(koleksi_id);
  }

  if (userid) {
    payload.userid = parseInt(userid);
  }

  if (bukuid) {
    payload.bukuid = parseInt(bukuid);
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const resultCount = await prisma.Koleksipribadi.count({
      where: {
        deletedAt: null,
      },
    });
    const totalPage = Math.ceil(resultCount / perPage);
    const skip = (page - 1) * perPage;
    const categories = await prisma.Koleksipribadi.findMany({
      skip,
      take: perPage,
      where: {
        koleksi_id: payload.koleksi_id,
        userid: payload.userid,
        bukuid: payload.bukuid,
        deletedAt: null,
      },
      select: {
        id: true,
        koleksi_id: true,
        userid: true,
        bukuid: true},
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
  const { koleksi_id, bukuid, userid } = req.body;

  const payload = {
    koleksi_id,
    bukuid,
    userid,
  };

  if (!koleksi_id || !bukuid || !userid) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const checkRelationCategory = await prisma.Koleksipribadi.findUnique({
      where: {
        koleksi_id,
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

    const categories = await prisma.Koleksipribadi.create({
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
  const { koleksi_id, bukuid, userid } = req.body;
  const { id } = req.params;
  const updatedAt = new Date();

  // get relation
  const getCategories = await prisma.Koleksipribadi.findUnique({
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
    koleksi_id,
    userid,
    bukuid,
    updatedAt
  };

  if (!koleksi_id || !bukuid || !userid) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const getRelationCategories = await prisma.Koleksipribadi.update({
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
  const { koleksi_id } = req.params;
  const deletedAt = new Date();

  const categoriesRelation = await prisma.Koleksipribadi.findUnique({
    where: {
      koleksi_id: parseInt(koleksi_id),
    },
  });

  if (!categoriesRelation) {
    let resp = ResponseTemplate(null, "Data Not Found", null, 404);
    res.status(404).json(resp);
    return;
  }

  try {
    const updateRelation = await prisma.Koleksipribadi.update({
      where: {
        koleksi_id: parseInt(koleksi_id),
      },
      data: {
        // unique value for soft delete
        koleksi_id: parseInt(
          -`${categoriesRelation.id}${koleksi_id}`,
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
