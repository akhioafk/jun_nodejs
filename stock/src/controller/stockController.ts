import { stockService } from "../service/stockService"

class StockController {
    async createStockController(req, res) {
        try {
            const { shop_id, product_plu, shelf_quantity, order_quantity } = req.body

            if (shop_id == null || product_plu == null || shelf_quantity == null || order_quantity == null) {
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

            if (shop_id == null || product_plu == null || shelf_quantity_add == null || order_quantity_add == null) {
                return res.status(400).json({'message': 'all fields are required'})
            }

            const updatedStock = await stockService.increaseStockService(shop_id, product_plu, shelf_quantity_add, order_quantity_add)
            
            res.status(201).json(updatedStock)
            
        } catch(error) {
            return res.status(400).json({error: error.message})
        }
    }

    async decreaseStockController(req, res) {
        try {
            const { shop_id, product_plu, shelf_quantity_deduct, order_quantity_deduct } = req.body

            if (shop_id == null || product_plu == null || shelf_quantity_deduct == null || order_quantity_deduct == null) {
                return res.status(400).json({'message': 'all fields are required'})
            }

            const updatedStock = await stockService.decreaseStockService(shop_id, product_plu, shelf_quantity_deduct, order_quantity_deduct)
            
            res.status(201).json(updatedStock)
            
            } catch(error) {
                return res.status(400).json({error: error.message})
            }        
    }

    async getStocks(req, res) {
        try {
            const filters = {
                plu: req.query.plu,
                shopId: req.query.shop_id,
                quantityOnShelfFrom: req.query.quantity_on_shelf_from,
                quantityOnShelfTo: req.query.quantity_on_shelf_to,
                quantityInOrderFrom: req.query.quantity_in_order_from,
                quantityInOrderTo: req.query.quantity_in_order_to,
              };
            const stocks = await stockService.getFilteredStock(filters);
            res.json(stocks);
        }  catch(error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const stockController = new StockController();