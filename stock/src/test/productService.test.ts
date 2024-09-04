import { getProductRepository } from '../repository/repositories'; 
import { createProductService } from '../service/productService';

jest.mock('../repository/repositories', () => {
    const saveMock = jest.fn();

    return {
        getProductRepository: () => ({
            save: saveMock,
        }),
    };
});

describe('product service', () => {
    let saveMock: jest.Mock;

    beforeEach(() => {
        saveMock = (getProductRepository().save as jest.Mock).mockResolvedValue({
            plu: '12345',
            name: 'product name',
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a product', async () => {
        const productData = { plu: '12345', name: 'product name' };

        const result = await createProductService(productData.plu, productData.name);

        expect(saveMock).toHaveBeenCalledWith(expect.objectContaining({
            plu: productData.plu,
            name: productData.name
        }));
        
        expect(result).toEqual(productData);
    });
});
