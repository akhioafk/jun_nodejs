import { Shop } from "../entity/shopEntity";
import { shopRepository } from "../repository/repositories"

export const createShopService = async (name: string) => {
    const ShopRepository = shopRepository;
    const shop = new Shop()
    
    shop.name = name;
    return await ShopRepository.save(shop)
}