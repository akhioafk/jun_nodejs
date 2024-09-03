import { productRepository, shopRepository, stockRepository } from "../repository/repositories"

export const createStockService = async (shop_id: number, product_plu: number, shelf_quantity: number, order_quantity: number) => {
    const StockRepository = stockRepository;
    const ShopRepository = shopRepository;
    const ProductRepository = productRepository;

    const shop = await ShopRepository.findOne({
        where: {
            id: shop_id
        }
    });
    if (!shop) {
        throw new Error(`shop with ID {shop_id} was not found bro`)
    }

    const product = await ProductRepository.findOne({
        where: {
            plu: product_plu
        }
    });
    if (!product) {
        throw Error(`product with PLU {product_plu} was not found bro`)
    }

    const stock = StockRepository.create({
        shop,
        product,
        shelf_quantity: shelf_quantity,
        order_quantity: order_quantity
    })

    return await StockRepository.save(stock)
}