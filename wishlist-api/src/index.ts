import express from "express";
import cors from "cors";
import productsRoute from "./routes/products";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/products", productsRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server rodando em http://localhost:${PORT}`));