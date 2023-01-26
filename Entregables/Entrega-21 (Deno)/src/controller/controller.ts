import { Response, Request } from "../dependencies/dependencies.ts"

interface Products {
    nombre: string;
    descripcion: string;
    precio: string;
    id: number;
}

const products: Products[] = [];

const getById = (x: number) => {
    const productId = products.find(product => product.id === x);
    return productId
}

export const getProducts = ({ response }: { response: Response; }) => {
    if (products.length === 0) { response.body = "No existen productos"; }
    else { response.body = products; }
}

export const getProductById = ({ params, response }: { params: { id: string }; response: Response; }) => {
    const product = getById(parseInt(params.id))
    if (product) { response.body = product; }
    else { response.body = "Producto no encontrado"; }
}

export const postProduct = async ({ request, response }: { request: Request; response: Response; }) => {
    const object = await request.body();
    const auxProd = await object.value;

    let newId;
    products.length == 0 ? newId = 1 : newId = products.length + 1;

    if (!auxProd.nombre || !auxProd.precio || !auxProd.descripcion) {
        response.body = "Ingrese todos los datos del producto";
    } else {

        auxProd.id = newId;
        products.push(auxProd);

        response.body = {
            product: auxProd
        };
    }
}

export const updateProduct = async ({ params, request, response }: { params: { id: string }; request: Request; response: Response; }) => {
    const product = getById(parseInt(params.id))
    const objeto = await request.body();
    const auxProd = await objeto.value;

    if (!product) {
        response.body = "Producto no encontrado"
    } else if (!auxProd.nombre || !auxProd.precio || !auxProd.descripcion) {
        response.body = "Ingrese todos los datos del producto";
    }

    const newProducto = {
        "nombre": auxProd.nombre,
        "precio": auxProd.precio,
        "descripcion": auxProd.descripcion,
        "id": parseInt(params.id)
    }
    const index = products.findIndex(producto => producto.id === parseInt(params.id));
    products[index] = newProducto
    response.body = {
        mensaje: "Producto actualizado",
        Producto: newProducto
    };
}

export const deleteProduct = ({ params, response }: { params: { id: string }; response: Response; }) => {
    const iD = getById(parseInt(params.id))

    if (!iD) { response.body = "Producto no encontrado"; }
    else {
        const index = products.findIndex(producto => producto.id === parseInt(params.id));
        products.splice(index, 1);
        response.body = {
            mensaje: "Producto eliminado",
            Producto: products
        };
    }
}