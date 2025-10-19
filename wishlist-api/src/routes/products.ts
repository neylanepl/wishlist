import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

type ProductsShape = {
  total: number;
  pageSize: number;
  totalPages: number;
  products: unknown[];
};

const isValidProducts = (data: any): data is ProductsShape => {
  return (
    data != null &&
    typeof data.total === "number" &&
    typeof data.pageSize === "number" &&
    typeof data.totalPages === "number" &&
    Array.isArray(data.products)
  );
};

router.get("/", async (req: Request, res: Response) => {
  try {
    // dynamic import so failures can be handled at request time and tested
    const mod = await import("../data/mock-products.json");
    const data = (mod && (mod as any).default) ?? mod;

    if (!isValidProducts(data)) {
      return res.status(500).json({ error: "Invalid products data" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Failed to load products data:", err);
    return res.status(500).json({ error: "Failed to load products data" });
  }
});

export default router;