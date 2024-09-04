import { Router } from "express";
import { stockController } from "../controller/stockController";

const stockRoutes = Router()

stockRoutes.post('/create', stockController.createStockController)
stockRoutes.post('/update', stockController.increaseStockController)

export default stockRoutes;