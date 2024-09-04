import { Router } from "express";
import { productController } from "../controller/productController";

const productRoutes = Router();

productRoutes.post('/create', productController.createProductController);
productRoutes.get('/', productController.getProducts)

export default productRoutes;