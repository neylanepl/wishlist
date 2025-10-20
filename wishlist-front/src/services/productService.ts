import { api } from "./api";
import type { ProductsResponseDTO } from "../types/Product";
import type { ProductsResponse } from "../types/Product";
import { normalizeProduct } from "../types/Product";

export async function getProducts(): Promise<ProductsResponse> {
  try {
    const response = await api.get<ProductsResponseDTO>("/products");
    const data = response.data;

    if (!Array.isArray(data.products)) {
      console.warn("Formato inválido: 'products' não é um array.");
      return {
        total: 0,
        pageSize: 0,
        totalPages: 0,
        products: [],
      };
    }

    const normalized = data.products.map(normalizeProduct);

    return {
      total: data.total,
      pageSize: data.pageSize,
      totalPages: data.totalPages,
      products: normalized,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return {
      total: 0,
      pageSize: 0,
      totalPages: 0,
      products: [],
    };
  }
}