import { createConnection, getRepository } from "typeorm";
import { Stock } from "../entity/stockEntity";
import { Shop } from "../entity/shopEntity";
import { Product } from "../entity/productEntity";

let stockRepository;
let shopRepository;
let productRepository;

export const initializeRepositories = async() => {
    await createConnection().then(() => {
        console.log('db connected bro')
    })

    stockRepository = getRepository(Stock)
    shopRepository = getRepository(Shop)
    productRepository = getRepository(Product)
}
export { stockRepository, shopRepository, productRepository }