import { Router } from "express";
import type { Request, Response } from "express";
import products from "../data/mock-products.json" with { type: "json" };

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json(products);
});

export default router;