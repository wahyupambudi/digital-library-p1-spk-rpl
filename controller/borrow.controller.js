const { ResponseTemplate, ResGet } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Get(req, res) {
  const {
    peminjaman_id,
    userid,
    bukuid,
    tanggal_peminjaman,
    tanggal_pengembalian,
    status_peminjaman,
  } = req.query;

  function setPayloadDate(property, date) {
    if (date !== undefined) {
      return date + "T00:00:00.000Z";
    }
    return undefined;
  }

  const payload = {};

  if (peminjaman_id) {
    payload.peminjaman_id = parseInt(peminjaman_id);
  }

  if (userid) {
    payload.userid = parseInt(userid);
  }

  if (bukuid) {
    payload.bukuid = parseInt(bukuid);
  }

  payload.tanggal_pengembalian = setPayloadDate(
    "tanggal_pengembalian",
    tanggal_pengembalian,
  );

  payload.tanggal_peminjaman = setPayloadDate(
    "tanggal_peminjaman",
    tanggal_peminjaman,
  );

  payload.status_peminjaman =
    status_peminjaman !== undefined ? [status_peminjaman] : undefined;

  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const resultCount = await prisma.Peminjaman.count({
      where: {
        deletedAt: null,
      },
    });
    const totalPage = Math.ceil(resultCount / perPage);
    const skip = (page - 1) * perPage;
    const borrows = await prisma.Peminjaman.findMany({
      skip,
      take: perPage,
      where: {
        peminjaman_id: payload.peminjaman_id,
        userid: payload.userid,
        bukuid: payload.bukuid,
        tanggal_peminjaman: {
          equals: payload.tanggal_peminjaman,
        },
        tanggal_pengembalian: {
          equals: payload.tanggal_pengembalian,
        },
        status_peminjaman: {
          in: payload.status_peminjaman,
        },
        deletedAt: null,
      },
      select: {
        id: true,
        peminjaman_id: true,
        userid: true,
        bukuid: true,
        tanggal_peminjaman: true,
        tanggal_pengembalian: true,
        status_peminjaman: true,
      },
    });

    let resp = ResGet(
      200,
      "success",
      null,
      page,
      totalPage,
      resultCount,
      borrows,
    );
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
  const {
    peminjaman_id,
    userid,
    bukuid,
    tanggal_peminjaman,
    tanggal_pengembalian,
    status_peminjaman,
  } = req.body;

  const payload = {
    peminjaman_id,
    userid,
    bukuid,
    tanggal_peminjaman,
    tanggal_pengembalian,
    status_peminjaman,
  };

  if (
    !peminjaman_id ||
    !userid ||
    !bukuid ||
    !tanggal_peminjaman ||
    !tanggal_pengembalian ||
    !status_peminjaman
  ) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const checkBorrowId = await prisma.Peminjaman.findUnique({
      where: {
        peminjaman_id,
      },
    });
    if (checkBorrowId) {
      let resp = ResponseTemplate(null, "Id already used", null, 400);
      res.status(400).json(resp);
      return;
    }

    const borrow = await prisma.Peminjaman.create({
      data: payload,
    });
    let resp = ResponseTemplate(borrow, "success", null, 200);
    res.json(resp);
  } catch (error) {
    // statements
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", null, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Delete(req, res) {
  const { peminjaman_id } = req.params;
  const deletedAt = new Date();

  const getBorrow = await prisma.Peminjaman.findUnique({
    where: {
      peminjaman_id: parseInt(peminjaman_id),
    },
  });

  if (!getBorrow) {
    let resp = ResponseTemplate(null, "Data is not found");
    res.status(400).json(resp);
    return;
  }

  try {
    const deleteBorrow = await prisma.Peminjaman.update({
      where: {
        peminjaman_id: parseInt(peminjaman_id)
      },
      data: {
        peminjaman_id: parseInt(-`${getBorrow.id}${peminjaman_id}`),
        deletedAt
      }
    })
    let resp = ResponseTemplate(deleteBorrow, "success", null, 200)
    res.json(resp);
    return
  } catch(error) {
    // statements
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", null, 500);
    res.status(500).json(resp);
    return;
  }
}

module.exports = { Get, Insert, Delete };
