import express from "express";
import {
  getAllData,
  getPajak,
  getPajakById,
  getAllByParams,
} from "../controllers/Pajak.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/pajak", verifyUser, getPajak);
router.post("/pajak/:id", verifyUser, getPajakById);
router.get("/pajak/semua", verifyUser, getAllData);
router.get("/pajak/semua/:param", verifyUser, getAllByParams);

export default router;
