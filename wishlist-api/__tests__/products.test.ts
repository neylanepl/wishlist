import request from "supertest";
import express from "express";
import fs from "fs";
import { describe, expect, it, beforeAll, afterEach, jest } from "@jest/globals";

describe("Products Route", () => {
  describe("Integration - basic", () => {
    let app: express.Express;
    let fixture: any;

    beforeAll(async () => {
      const { default: productsRoute } = await import("../src/routes/products.ts");
      app = express();
      app.use(express.json());
      app.use("/products", productsRoute);

      // load fixture directly from disk for a ground-truth comparison
      const fixturePath = require.resolve("../src/data/mock-products.json");
      const raw = fs.readFileSync(fixturePath, "utf8");
      fixture = JSON.parse(raw);
    });

    it("deve retornar a lista de produtos", async () => {
      const res = await request(app).get("/products");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(fixture);
      const productList = res.body.products;
      expect(Array.isArray(productList)).toBe(true);
    });

    it("deve retornar o Content-Type como application/json", async () => {
      const res = await request(app).get("/products");

      expect(res.status).toBe(200);
      const contentType = res.headers["content-type"] as string | undefined;
      expect(contentType).toBeDefined();
      expect(contentType).toMatch(/application\/json/);
    });

    it("deve expor metadados numéricos corretos (total, pageSize, totalPages)", async () => {
      const res = await request(app).get("/products");

      expect(res.status).toBe(200);

      // tipos
      expect(typeof res.body.total).toBe("number");
      expect(typeof res.body.pageSize).toBe("number");
      expect(typeof res.body.totalPages).toBe("number");

      // valores consistentes com o fixture
      expect(res.body.total).toBe(fixture.total);
      expect(res.body.pageSize).toBe(fixture.pageSize);
      expect(res.body.totalPages).toBe(fixture.totalPages);

      // relação entre campos e lista de produtos
      expect(Array.isArray(res.body.products)).toBe(true);
      expect(res.body.products.length).toBe(res.body.total);
      expect(res.body.products.length).toBe(res.body.pageSize);
      expect(res.body.totalPages).toBe(Math.ceil(res.body.total / res.body.pageSize));
    });
  });

  describe("Validation - product shape & invariants", () => {
    let app: express.Express;
    let resBody: any;

    beforeAll(async () => {
      const { default: productsRoute } = await import("../src/routes/products.ts");
      app = express();
      app.use(express.json());
      app.use("/products", productsRoute);

      const res = await request(app).get("/products");
      expect(res.status).toBe(200);
      resBody = res.body;
    });

    it("cada produto possui os campos obrigatórios com os tipos esperados", () => {
      const productList = resBody.products;
      expect(Array.isArray(productList)).toBe(true);

      productList.forEach((p: any) => {
        // campos obrigatórios
        expect(p).toHaveProperty("code");
        expect(p).toHaveProperty("name");
        expect(p).toHaveProperty("available");
        expect(p).toHaveProperty("visible");
        expect(p).toHaveProperty("details");
        expect(p).toHaveProperty("priceInCents");
        expect(p).toHaveProperty("salePriceInCents");
        expect(p).toHaveProperty("rating");
        expect(p).toHaveProperty("image");
        expect(p).toHaveProperty("stockAvailable");

        // tipos básicos
        expect(typeof p.code).toBe("string");
        expect(p.code.length).toBeGreaterThan(0);
        expect(typeof p.name).toBe("string");
        expect(p.name.length).toBeGreaterThan(0);
        expect(typeof p.available).toBe("boolean");
        expect(typeof p.visible).toBe("boolean");
        expect(typeof p.details).toBe("object");
        expect(typeof p.details.name).toBe("string");
        expect(typeof p.details.description).toBe("string");
        expect(typeof p.priceInCents).toBe("string");
        expect(typeof p.salePriceInCents).toBe("string");
        expect(typeof p.rating).toBe("number");
        expect(typeof p.image).toBe("string");
        expect(typeof p.stockAvailable).toBe("boolean");

        // detalhe: details.name espelha o nome principal
        expect(p.details.name).toBe(p.name);
      });
    });

    it("valida formatos de preço, rating e invariantes de negócio", () => {
      const productList = resBody.products;

      productList.forEach((p: any) => {
        // preços em centavos devem ser strings compostas apenas por dígitos
        expect(p.priceInCents).toMatch(/^\d+$/);
        expect(p.salePriceInCents).toMatch(/^\d+$/);

        const price = parseInt(p.priceInCents, 10);
        const sale = parseInt(p.salePriceInCents, 10);

        expect(Number.isInteger(price)).toBe(true);
        expect(Number.isInteger(sale)).toBe(true);
        expect(price).toBeGreaterThanOrEqual(0);
        expect(sale).toBeGreaterThanOrEqual(0);

        // regra de negócio: preço em promoção não pode ser maior que o preço original
        expect(sale).toBeLessThanOrEqual(price);

        // rating entre 0 e 5
        expect(p.rating).toBeGreaterThanOrEqual(0);
        expect(p.rating).toBeLessThanOrEqual(5);
      });
    });

    it("garante unicidade dos códigos de produto", () => {
      const productList = resBody.products;
      const codes = productList.map((p: any) => p.code);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(codes.length);
    });
  });

  describe("Error handling - malformed/missing data", () => {
    afterEach(() => {
      // clear module registry so subsequent tests start clean
      jest.resetModules();
      jest.clearAllMocks();
    });

    it("retorna 200 com lista vazia quando o fixture tem products: []", async () => {
      jest.resetModules();
      const mockData = { total: 0, pageSize: 0, totalPages: 0, products: [] };

      // mock the JSON module before importing/using the route
      const jsonPath = require.resolve("../src/data/mock-products.json");
      jest.doMock(jsonPath, () => ({ default: mockData }), { virtual: true });

      const { default: productsRoute } = await import("../src/routes/products.ts");
      const app = express();
      app.use(express.json());
      app.use("/products", productsRoute);

      const res = await request(app).get("/products");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockData);
      expect(Array.isArray(res.body.products)).toBe(true);
      expect(res.body.products.length).toBe(0);
    });

    it("retorna 500 quando o fixture possui formato inválido (sem products)", async () => {
      jest.resetModules();
      const jsonPath = require.resolve("../src/data/mock-products.json");
      jest.doMock(jsonPath, () => ({ default: {} }), { virtual: true });

      const { default: productsRoute } = await import("../src/routes/products.ts");
      const app = express();
      app.use(express.json());
      app.use("/products", productsRoute);

      const res = await request(app).get("/products");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error");
    });

    it("retorna 500 quando ocorre erro ao importar o fixture de produtos", async () => {
      jest.resetModules();
      const jsonPath = require.resolve("../src/data/mock-products.json");
      // make the module throw when imported
      jest.doMock(
        jsonPath,
        () => {
          throw new Error("Import failure");
        },
        { virtual: true }
      );

      const { default: productsRoute } = await import("../src/routes/products.ts");
      const app = express();
      app.use(express.json());
      app.use("/products", productsRoute);

      const res = await request(app).get("/products");

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error");
    });
  });
});
