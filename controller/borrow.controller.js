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
  } = req.body;
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

module.exports = {Get, Insert, };
