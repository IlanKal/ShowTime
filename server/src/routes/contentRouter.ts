import express from "express";
import { getTrends } from "../controllers/contentController";

export const router = express.Router();

router.get("/trends", getTrends);

export default router;