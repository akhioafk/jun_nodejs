import { Shop } from "../entity/shopEntity";
import { getShopRepository } from "../repository/repositories"

export const createShopService = async (name: string) => {
    const shopRepository = getShopRepository();
    const shop = new Shop()
    
    shop.name = name;
    return await shopRepository.save(shop)
}