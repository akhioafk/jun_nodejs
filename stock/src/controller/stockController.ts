import { createStockService } from "../service/stockService"

export const createStockController = async (req, res) => {
    try {
        const { shop_id, product_plu, shelf_quantity, order_quantity } = req.body

        if (!shop_id || !product_plu || !shelf_quantity || !order_quantity) {
            return res.status(400).json({'message': 'all fields are required'})
        }

        const newStock = await createStockService(shop_id, product_plu, shelf_quantity, order_quantity)
        
        res.status(201).json(newStock)
        
    } catch(error) {
        return res.status(400).json({error: error.message})
    }
}