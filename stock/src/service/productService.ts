import { Product } from "../entity/productEntity";
import { productRepository } from "../repository/repositories"

export const createProduct = async (plu: string, name: string) => {
    const ProductRepository = productRepository;
    const product = new Product();
    product.plu = plu;
    product.name = name

    return await ProductRepository.save(product);
};