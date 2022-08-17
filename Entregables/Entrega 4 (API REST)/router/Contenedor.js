class Products {
  constructor() {
    this.products = [];
    this.lastId = 0;
  }

  save(newProduct) {
    // Obtiene los datos del archivo
    let isUnique = products.find(
      (product) => product.title === newProduct.title
    );
    if (isUnique !== undefined) {
      return { error: "Este producto ya se encuentra creado" };
    }

    // En este caso this hace referencia a la clase, ya que se generó en el constructor
    const productToAdd = { ...newProduct, id: ++this.id };
    this.productos.push(productToAdd);
    return productToAdd;
  }

  getById(id) {
    const product = this.products.find((product) => {
      if (product.id == id) {
        return product;
      }
    });
    const result = product ? product : { error: "Producto no encontrado" };
    return result;
  }

  getAll() {
    return this.products;
  }

  deleteById(id) {
    const filteredProducts = this.products.filter(
      (product) => product.id != id
    );

    if (filteredProducts.length === products.length) {
      return {
        error: `No se encontró un producto con el ID ingresado ( ${id} )`,
      };
    }

    this.products = filteredProducts;
  }

  update(id, newInfo) {
    const { title, price, thumbnail } = newInfo;
    let productIndex = products.findIndex((product) => {
      return product.id == id;
    });

    if (!productIndex) {
      return {
        error: `No se encontró un producto con el ID ingresado ( ${id} )`,
      };
    } else if (!title && !price && !thumbnail) {
      return {
        error: `No se ingresaron datos para actualizar`,
      };
    } else {
      if (title) {
        this.products[productIndex].title = title;
      }
      if (price) {
        this.products[productIndex].price = price;
      }
      if (thumbnail) {
        this.products[productIndex].thumbnail = thumbnail;
      }
    }
  }
}

module.exports = { Products };
