import { stockService } from "../service/stockService"

class StockController {
    async createStockController(req, res) {
        try {
            const { shop_id, product_plu, shelf_quantity, order_quantity } = req.body

            if (!shop_id || !product_plu || !shelf_quantity || !order_quantity) {
                return res.status(400).json({'message': 'all fields are required'})
            }

            const newStock = await stockService.createStockService(shop_id, product_plu, shelf_quantity, order_quantity)
            
            res.status(201).json(newStock)
            
        } catch(error) {
            return res.status(400).json({error: error.message})
        }
    }

    async increaseStockController(req, res) {
        try {
            const { shop_id, product_plu, shelf_quantity_add, order_quantity_add } = req.body

            if (!shop_id || !product_plu || !shelf_quantity_add || !order_quantity_add) {
                return res.status(400).json({'message': 'all fields are required'})
            }

            const updatedStock = await stockService.increaseStockService(shop_id, product_plu, shelf_quantity_add, order_quantity_add)
            
            res.status(201).json(updatedStock)
            
        } catch(error) {
            return res.status(400).json({error: error.message})
        }
    }
}

export const stockController = new StockController();