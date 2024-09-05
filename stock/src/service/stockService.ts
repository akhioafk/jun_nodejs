import axios from "axios";
import { getProductRepository, getShopRepository, getStockRepository } from "../repository/repositories";

async function updateHistoryStock(plu, shop_id, action) {
    await axios.post('http://history-server:3001/api/history/create', {
        plu,
        shop_id,
        action
    })
}

class StockService {
    async createStockService(shop_id: number, product_plu: number, shelf_quantity: number, order_quantity: number) {
        const productRepository = getProductRepository();
        const stockRepository = getStockRepository();
        const shopRepository = getShopRepository();
        const shop = await shopRepository.findOneBy({
            id: shop_id
        });
        if (!shop) {
            throw new Error(`shop with ID ${shop_id} was not found bro`)
        }
    
        const product = await productRepository.findOneBy({
            plu: product_plu
        });
        if (!product) {
            throw Error(`product with PLU ${product_plu} was not found bro`)
        }
    
        const stock = stockRepository.create({
            shop,
            product_plu,
            shelf_quantity: shelf_quantity,
            order_quantity: order_quantity
        })
        
        await updateHistoryStock(product_plu, shop_id, 'Created Stock')
        return await stockRepository.save(stock)
    }
    
    async increaseStockService (shop_id: number, product_plu: number, shelf_quantity_add: number, order_quantity_add: number) {
        const stockRepository = getStockRepository();
        const stock = await stockRepository.findOne({
            where: {
                shop_id: shop_id,
                product_plu: product_plu 
            }
        })

        if (!stock) {
            throw new Error(`stock for shop_id ${shop_id} and plu product ${product_plu} was not found bro`);
        }

        stock.shelf_quantity += shelf_quantity_add
        stock.order_quantity += order_quantity_add

        await updateHistoryStock(product_plu, shop_id, `Increased Shelf Quantity by ${shelf_quantity_add} and Order Quantity by ${order_quantity_add}.`)
        return await stockRepository.save(stock)
    }

    async decreaseStockService (shop_id: number, product_plu: number, shelf_quantity_add: number, order_quantity_add: number) {
        const stockRepository = getStockRepository();
        const stock = await stockRepository.findOne({
            where: {
                shop_id: shop_id,
                product_plu: product_plu
            }
        })

        if (!stock) {
            throw new Error(`stock for shop_id ${shop_id} and plu product ${product_plu} was not found bro`);
        }

        stock.shelf_quantity -= shelf_quantity_add
        stock.order_quantity -= order_quantity_add

        await updateHistoryStock(product_plu, shop_id, `Decreased Shelf Quantity by ${shelf_quantity_add} and Order Quantity by ${order_quantity_add}.`)
        return await stockRepository.save(stock)
    }

    async getFilteredStock (filters:any) {
        const stockRepository = getStockRepository();
        const queryBuilder = stockRepository.createQueryBuilder("stock").
        innerJoinAndSelect("stock.product", "product")

        if (filters.plu) {
            queryBuilder.andWhere("product.plu = :plu", { plu: filters.plu })
        }

        if (filters.shop_id) {
            queryBuilder.andWhere("product.shop_id = :shop_id", { shop_id: filters.shop_id })
        }

        if (filters.quantityOnShelfFrom !== undefined && filters.quantityOnShelfTo !== undefined) {
            queryBuilder.andWhere("stock.quantityOnShelf BETWEEN :from AND :to", {
              from: filters.quantityOnShelfFrom,
              to: filters.quantityOnShelfTo,
            });
          }
        
        if (filters.quantityInOrderFrom !== undefined && filters.quantityInOrderTo !== undefined) {
        queryBuilder.andWhere("stock.quantityInOrder BETWEEN :from AND :to", {
            from: filters.quantityInOrderFrom,
            to: filters.quantityInOrderTo,
            });
        }

        return queryBuilder.getMany();
    }
}

export const stockService = new StockService()
