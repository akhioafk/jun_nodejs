import { createShopService } from "../service/shopService";

export const createShopController = async (req, res) => {
    try {
        const name = req.body.name;

        if (!name) {
            return res.status(400).json({'message': 'name required'})
        }

        const newShop = await createShopService(name)
        res.status(201).json(newShop)
    } catch (error) {
        console.log('thats the problem:', error)
        return res.status(500).json({'message': 'server error'})
    }
}