import { Router } from "../dependencies/dependencies.ts"
import { getProducts, getProductById, postProduct, updateProduct, deleteProduct } from "../controller/controller.ts";

const router = new Router();

router.get('/api/productos', getProducts);
router.get('/api/productos/:id', getProductById);
router.post('/api/productos', postProduct);
router.put('/api/productos/:id', updateProduct);
router.delete('/api/productos/:id', deleteProduct);

export default router;