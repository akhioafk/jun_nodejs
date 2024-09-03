import { createProduct } from "../service/productService";

export const createProductController = async (req, res) => {
    try {
        const { plu, name } = req.body;

        if (!plu || !name ) {
            return res.status(400).json({ 'message': 'plu and name required'})

        }

        const newProduct = await createProduct(plu, name);

        res.status(201).json(newProduct);

    } catch(error) {
        console.log(error)
        res.status(500).json({ 'message': 'server error'})
    }
}