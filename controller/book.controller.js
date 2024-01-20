const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function Get (req, res) {
  const (bukuid, judul, penulis, penerbit, tahun_terbit) = req.body;
}

async function Insert (req, res) {
  const (bukuid, judul, penulis, penerbit, tahun_terbit) = req.body;
}


async function Update (req, res) {
  const (bukuid, judul, penulis, penerbit, tahun_terbit) = req.body;
}

async function Delete (req, res) {
  const (bukuid, judul, penulis, penerbit, tahun_terbit) = req.body;
}

module.exports = {Get, Insert, Update, Delete}