const ProductManager = require("./managerProducts.js");

const express = require("express");
const app = express();

const manager = new ProductManager("./src/DB.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;

app.get("/products", async (req, res) => {
  try {
    const arrayProducts = await manager.uploadProducts();
    let quantity = parseInt(req.query.quantity);
    if (!isNaN(quantity) && quantity > 0) {
      const arrayQuantity = arrayProducts.slice(0, quantity);
      return res.send(arrayQuantity);
    } else if (!isNaN(quantity) && quantity <= 0) {
      return res.status(400).send("La cantidad debe ser mayor a 0");
    } else {
      return res.send(arrayProducts);
    }
  } catch (error) {
    console.log("Ha habido un error", error);
    return res.status(500).send("Error en la solicitud");
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send("El Id del producto no es válido");
    }
    const filter = await manager.getProductById(id);
    if (filter) {
      return res.send(filter);
    } else {
      console.log("Producto no encontrado");
      return res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.log("Error al procesar la solicitud", error);
    return res.status(500).send("Error en la solicitud");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

