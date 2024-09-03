import { createProductService } from '../service/productService';
import { productRepository } from '../repository/repositories';

jest.mock('../repository/repositories', () => ({
    productRepository: {
        save: jest.fn(),
    },
}));
jest.mock('typeorm', () => ({
    PrimaryGeneratedColumn: jest.fn(),
    Column: jest.fn(),
    Entity: jest.fn(),
    getRepository: jest.fn(),
    OneToMany: jest.fn(),
    ManyToOne: jest.fn(),
    JoinColumn: jest.fn(),
    Unique: jest.fn()
}));


describe('product service', () => {
    let saveMock: jest.Mock;

    beforeEach(() => {
        saveMock = (productRepository.save as jest.Mock).mockResolvedValue({
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
