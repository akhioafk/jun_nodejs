import { createConnection, getRepository, Repository } from 'typeorm';
import { Stock } from '../entity/stockEntity';
import { Shop } from '../entity/shopEntity';
import { Product } from '../entity/productEntity';

let stockRepository: Repository<Stock>;
let shopRepository: Repository<Shop>;
let productRepository: Repository<Product>;

export const initializeRepositories = async () => {
    await createConnection().then(() => {
        console.log('DB connected bro');
    });

    stockRepository = getRepository(Stock);
    shopRepository = getRepository(Shop);
    productRepository = getRepository(Product);
    console.log("repositories initialized");
};

export const getStockRepository = () => stockRepository;
export const getShopRepository = () => shopRepository;
export const getProductRepository = () => productRepository;
