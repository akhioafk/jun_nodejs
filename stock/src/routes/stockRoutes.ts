import { Router } from "express";
import { createStockController } from "../controller/stockController";

const stockRoutes = Router()

stockRoutes.post('/create', createStockController)

export default stockRoutes;