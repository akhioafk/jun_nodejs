import { Product } from "../entity/productEntity";
import { getProductRepository } from "../repository/repositories"

class ProductService {
    async createProductService (plu: number, name: string) {
        const productRepository = getProductRepository()
        const product = new Product();
        product.plu = plu;
        product.name = name

        return await productRepository.save(product);
    };

    async getFilteredProduct (filters: any) {
        const productRepository = getProductRepository();
        const queryBuilder = productRepository.createQueryBuilder('product')

        if (filters.name) {
            queryBuilder.andWhere("product.name = :name", { name: filters.name });
        }

        if (filters.plu) {
            queryBuilder.andWhere("product.plu = :plu", { plu: filters.plu })
        }

        return queryBuilder.getMany()
    }
}

export const productService = new ProductService();