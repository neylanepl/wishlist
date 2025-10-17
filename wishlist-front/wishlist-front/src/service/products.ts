import axios from "axios";
import type { Product } from "../types/Product";

const API_URL = "http://localhost:3000/products";

export async function getProducts(): Promise<Product[]> {
  const response = await axios.get(API_URL);
  const data = response.data;

  return data.products;
}
