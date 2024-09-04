import { productService } from "../service/productService";

class ProductController {
    async createProductController (req, res) {
        try {
            const { plu, name } = req.body;

            if (!plu || !name ) {
                return res.status(400).json({ 'message': 'plu and name required'})

            }

            const newProduct = await productService.createProductService(plu, name);

            res.status(201).json(newProduct);

        } catch(error) {
            console.log(error)
            res.status(500).json({ 'message': 'server error'})
        }
    }

    async getProducts(req, res) {
        try {
            const filters = {
                name: req.query.name as string,
                plu: req.query.plu as string,
            }

            const products = await productService.getFilteredProduct(filters);
            res.json(products)
        } catch(error) {
            res.status(500).json({error: error.message})
        }
    }
}

export const productController = new ProductController();