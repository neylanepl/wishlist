import { api } from "./api";
import type { ProductsResponse } from "../types/Product";

export async function getProducts(): Promise<ProductsResponse> {
  try {
    const response = await api.get<ProductsResponse>("/products");
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

    return data;
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