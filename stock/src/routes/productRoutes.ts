import { Router } from "express";
import { createProductController } from "../controller/productController";

const productRoutes = Router();

productRoutes.post('/create', createProductController);

export default productRoutes;