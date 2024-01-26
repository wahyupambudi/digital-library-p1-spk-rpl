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
    const getCollection = await prisma.Koleksipribadi.findMany({
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
      getCollection,
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
    const checkCollection = await prisma.Koleksipribadi.findUnique({
      where: {
        koleksi_id,
      },
    });

    if (checkCollection) {
      let resp = ResponseTemplate(
        null,
        "Id Kategori Relation already used",
        null,
        400,
      );
      res.status(400).json(resp);
      return;
    }

    const collection = await prisma.Koleksipribadi.create({
      data: payload,
    });

    let resp = ResponseTemplate(collection, "success", null, 200);
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
  const getCollection = await prisma.Koleksipribadi.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!getCollection) {
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
    const getCollection = await prisma.Koleksipribadi.update({
      where: {
        id: parseInt(id),
      },
      data: payload,
    });
    let resp = ResponseTemplate(getCollection, "success", null, 200);
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

  const getCollection = await prisma.Koleksipribadi.findUnique({
    where: {
      koleksi_id: parseInt(koleksi_id),
    },
  });

  if (!getCollection) {
    let resp = ResponseTemplate(null, "Data Not Found", null, 404);
    res.status(404).json(resp);
    return;
  }

  try {
    const updateCollection = await prisma.Koleksipribadi.update({
      where: {
        koleksi_id: parseInt(koleksi_id),
      },
      data: {
        // unique value for soft delete
        koleksi_id: parseInt(
          -`${getCollection.id}${koleksi_id}`,
        ),
        deletedAt,
      },
    });
    let resp = ResponseTemplate(updateCollection, "success", null, 202);
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
