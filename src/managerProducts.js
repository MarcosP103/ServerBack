const ProductManager = require('./app.js')

const productManager = new ProductManager("./DB.json");

productManager.addProduct("Remera", "100% algodon", 100, "remera.jpg", 1, 100);

const allProducts = productManager.getProducts();
console.log("Todos los productos: ", allProducts);

const productById = productManager.getProductsById(1);
console.log("el producto con ese Id: ", productById);

productManager.modProduct(1, { price: 120 });

productManager.addFile();

productManager.delProduct(1);
