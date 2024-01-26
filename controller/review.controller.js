const { ResponseTemplate, ResGet } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Get(req, res) {
  const { ulasan_id, userid, bukuid, ulasan, rating } = req.query;
  const payload = {};

  if (ulasan_id) {
    payload.ulasan_id = parseInt(ulasan_id);
  }

  if (userid) {
    payload.userid = userid;
  }

  if (bukuid) {
    payload.bukuid = parseInt(bukuid);
  }

  if (ulasan) {
    payload.ulasan = ulasan;
  }

  if (rating) {
    payload.rating = parseInt(rating);
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const resultCount = await prisma.Ulasanbuku.count({
      where: {
        deletedAt: null,
      },
    });
    const totalPage = Math.ceil(resultCount / perPage);
    const skip = (page - 1) * perPage;
    const getReview = await prisma.Ulasanbuku.findMany({
      skip,
      take: perPage,
      where: {
        ulasan_id: payload.ulasan_id,
        userid: payload.userid,
        bukuid: payload.bukuid,
        ulasan: {
          contains: ulasan,
          mode: "insensitive",
        },
        rating: payload.rating,
        deletedAt: null,
      },
      select: {
        id: true,
        ulasan_id: true,
        userid: true,
        bukuid: true,
        ulasan: true,
        rating: true,
      },
    });

    let resp = ResGet(
      200,
      "success",
      null,
      page,
      totalPage,
      resultCount,
      getReview,
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
  const { ulasan_id, userid, bukuid, ulasan, rating } = req.body;

  const payload = {
    ulasan_id,
    userid,
    bukuid,
    ulasan,
    rating,
  };

  if (!ulasan_id || !userid || !bukuid || !ulasan || !rating) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const checkUlasanId = await prisma.Ulasanbuku.findUnique({
      where: {
        ulasan_id,
      },
    });

    if (checkUlasanId) {
      let resp = ResponseTemplate(null, "Id already used", null, 400);
      res.status(400).json(resp);
      return;
    }

    const insertReview = await prisma.Ulasanbuku.create({
      data: payload,
    });

    let resp = ResponseTemplate(insertReview, "success", null, 200);
    res.json(resp);
  } catch (error) {
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", null, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Update(req, res) {
  const { ulasan_id, userid, bukuid, ulasan, rating } = req.body;
  const { id } = req.params;
  const updatedAt = new Date();

  // get relation
  const getReview = await prisma.Ulasanbuku.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!getReview) {
    let resp = ResponseTemplate(null, "Data Not Found", null, 404);
    res.status(404).json(resp);
    return;
  }

  const payload = {
    ulasan_id,
    userid,
    bukuid,
    ulasan,
    rating,
    updatedAt
  };

  if (!ulasan_id || !userid || !bukuid || !ulasan || !rating) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const getReview = await prisma.Ulasanbuku.update({
      where: {
        id: parseInt(id),
      },
      data: payload,
    });
    let resp = ResponseTemplate(getReview, "success", null, 200);
    res.json(resp);
    return;
  } catch (error) {
    // statements
    console.log(error);
    if (error.code === "P2002") {
      let resp = ResponseTemplate(null, "Id already used", null, 500);
      res.status(500).json(resp);
      return;
    } else if (error.code === "P2003") {
      let resp = ResponseTemplate(null, "Data Not Found", null, 500);
      res.status(500).json(resp);
      return;
    }
  }
}

async function Delete(req, res) {
  const { ulasan_id } = req.params;
  const deletedAt = new Date();

  const review = await prisma.Ulasanbuku.findUnique({
    where: {
      ulasan_id: parseInt(ulasan_id),
    },
  });

  if (!review) {
    let resp = ResponseTemplate(null, "Data is Not Found", null, 404);
    res.status(404).json(resp);
    return;
  }

  try {
    const categories = await prisma.Ulasanbuku.update({
      where: {
        ulasan_id: parseInt(ulasan_id),
      },
      data: {
        // unique value for soft delete
        ulasan_id: parseInt(-`${review.id}${ulasan_id}`),
        deletedAt,
      },
    });
    let resp = ResponseTemplate(categories, "success", null, 202);
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
