import { createProductController } from '../controller/productController';
import { createProduct } from '../service/productService';

jest.mock('../service/productService');
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


describe('product controller', () => {
  let mockRequest: any;
  let mockResponse: any;
  let nextFunction: any;

  beforeEach(() => {
    mockRequest = {
      body: { plu: '12345', name: 'product name' }
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    nextFunction = jest.fn();
  });

  it('should create a product', async () => {
    (createProduct as jest.Mock).mockResolvedValue({ id: 1, plu: '12345', name: 'product name' });

    await createProductController(mockRequest, mockResponse);

    expect(createProduct).toHaveBeenCalledWith('12345', 'product name');
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, plu: '12345', name: 'product name' });
  });

  it('should return 400 if plu or name is missing', async () => {
    mockRequest.body = { plu: '12345' };

    await createProductController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'plu and name required' });
  });

  it('should return 500 on server error', async () => {
    (createProduct as jest.Mock).mockRejectedValue(new Error('server error'));

    await createProductController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'server error' });
  });
});
