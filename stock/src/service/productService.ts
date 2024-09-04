import { Product } from "../entity/productEntity";
import { getProductRepository } from "../repository/repositories"

export const createProductService = async (plu: number, name: string) => {
    const productRepository = getProductRepository()
    const product = new Product();
    product.plu = plu;
    product.name = name

    return await productRepository.save(product);
};