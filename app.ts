import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 4000;
app.use(express.json());

let products = [
  {
    id: 1,
    name: "rame",
    cost: 500,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "ramee",
    cost: 100,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "rme",
    cost: 200,
    createdAt: new Date(),
  },
];

console.log("products:", products);
app.get("/api/products", (req: Request, res: Response) => {
  res.send({ success: true, data: products });
});

app.get("/api/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) {
    return res.status(404).json({ success: false, data: null });
  }
  res.send({ success: true, data: product });
});

app.post("/api/products", (req: Request, res: Response) => {
  const product = req.body;
  const lastId = products.length > 0 ? products[products.length - 1].id : 0;
  product.id = lastId + 1;
  products.push(product);
  res.send({ success: true, data: product });
});

app.delete("/api/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      data: null,
      message: `Product with ID ${id} not found`,
    });
  }
  const deletedProduct = products.splice(index, 1);
  res.send({
    success: true,
    data: deletedProduct[0],
    message: "Product deleted",
  });
});

app.put("/api/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      data: null,
      message: `Product with ID ${id} not found`,
    });
  }
  products[index] = { ...products[index], ...updatedProduct };
  res.send({
    success: true,
    data: products[index],
    message: "Product updated",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
