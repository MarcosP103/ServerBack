const fs = require("fs").promises;

class ProductManager {
  constructor(path) {
    this.productsFile = path;
    this.products = [];
  }

  //load
  async uploadProducts() {
    try {
      const data = await fs.readFile(this.productsFile, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        this.products = [];
      } else {
        throw error;
      }
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title && !description && !price && !thumbnail && !code && !stock) {
      console.log("Debe ingresar todos los campos");
      return;
    }
    if (this.products.find((product) => product.code === code)) {
      console.log("El producto ya existe");
      return;
    }

    const id =
      this.products.length > 0
        ? Math.max(...this.products.map((p) => p.id)) + 1
        : 1;
    const product = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
    this.addFile();
    console.log("Producto agregado correctamente");
  }
  //consult
  async getProducts() {
    try {
      await this.uploadProducts();
      return this.products;
    } catch (error) {
      console.log("Error al obtener los productos:", error);
      return [];
    }
  }

  getProductsById(id) {
    const product = this.products.find((prod) => prod.id === id);
    if (!product) {
      console.log("No se encontró el producto segun el ID indicado");
    }
    return product;
  }

  //mod
  async modProduct(id, productMod) {
    const indexProd = this.products.findIndex((product) => product.id === id);
    if (indexProd === -1) {
      console.error("No se encontro el producto por ID");
      return;
    }
    try {
      this.products[indexProd] = { ...this.products[indexProd], ...productMod };
      await this.addFile();
      console.log("Se ha agregado correctamente");
    } catch (error) {
      console.log("Hubo un problema al actualizar", error);
    }
  }

  async addFile() {
    try {
      await fs.writeFile(
        this.productsFile,
        JSON.stringify(this.products, null, 2)
      );
      console.log(
        "Productos agregados correctamente al archivo: ",
        this.productsFile
      );
    } catch (error) {
      console.log("Error", error);
    }
  }

  async delProduct(id) {
    const indexProd = this.products.findIndex((product) => product.id === id);
    if (indexProd === -1) {
      console.error("No se encontró el producto por ID");
      return;
    }
    try {
      this.products.splice(indexProd, 1);
      await this.addFile();
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.log("Hubo un problema al eliminar", error);
    }
  }
}

module.exports = ProductManager
