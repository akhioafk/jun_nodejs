import { Router } from "express";
import { stockController } from "../controller/stockController";

const stockRoutes = Router()

stockRoutes.post('/create', stockController.createStockController)
stockRoutes.post('/update/add', stockController.increaseStockController)
stockRoutes.post('/update/deduct', stockController.decreaseStockController)
stockRoutes.get('/', stockController.getStocks)

export default stockRoutes;