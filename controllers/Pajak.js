import Pajak from "../models/PajakModel.js";
import { Op } from "sequelize";

export const getPajak = async (req, res) => {
  try {
    const { nama } = req.body;

    const result = await Pajak.findAll({
      where: {
        nama: { [Op.like]: `%${nama}%` },
      },
    });

    if (!result) return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllData = async (req, res) => {
  try {
    const result = await Pajak.findAll();
    if (!result) return res.status(404).json({ msg: "Data kosong" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllByParams = async (req, res) => {
  const parameter = req.params.param;
  if (parameter === "true") {
    const result = await Pajak.findAll({
      where: {
        status_pembayaran: true,
      },
    });
    if (!result) return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.status(200).json(result);
  } else if (parameter === "false") {
    const result = await Pajak.findAll({
      where: {
        status_pembayaran: false,
      },
    });
    if (!result) return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.status(200).json(result);
  } else {
    return res.status(404).json({ msg: "kamu aneh" });
  }
};

export const getPajakById = async (req, res) => {
  try {
    const result = await Pajak.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!result) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const status = result.status_pembayaran;

    if (status === true) {
      res.status(200).json(result);
    } else {
      res
        .status(500)
        .json({ msg: "Maaf wajib pajak belum melunasi pembayarannya" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
