const express = require('express');
const ProductManager = require('./managerProducts.js');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productManager = new ProductManager('/DB.json');

app.get("/products", async (req, res) => {
  try {
    const arrayProducts = await productManager.uploadProducts();
    let limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
      const arrayLimit = arrayProducts.slice(0, limit);
      return res.send(arrayLimit);
    } else if (!isNaN(limit) && limit <= 0) {
      return res.status(400).send("La cantidad debe ser mayor a 0");
    } else {
      return res.send(arrayProducts);
    }
  } catch (error) {
    console.log("Ha habido un error", error);
    return res.status(500).send("Error en la solicitud");
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    let id = parseInt(req.params.pid);
    if (isNaN(id)) {
      return res.status(400).send("El Id del producto no es válido");
    }
    const filter = await productManager.getProductsById(id);
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
