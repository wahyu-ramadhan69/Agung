import express from "express";
import { getPajak, getPajakById } from "../controllers/Pajak.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/pajak", getPajak);
router.post("/pajak/:id", verifyUser, getPajakById);

export default router;
