import { Request, Response } from "express";
import { contentService } from "../services/contentService";

export async function getTrends(req: Request, res: Response) {
    try {
      const items = await contentService.getTrends();
      res.json(items);
    } catch (error) {
      console.error("Error in getTrends controller:", error);
      res.status(500).json({ error: "Failed to fetch trending items" });
    }
  }