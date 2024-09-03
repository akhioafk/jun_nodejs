import express from 'express';
import productRoutes from './routes/productRoutes';
import { initializeRepositories } from './repository/repositories';
import stockRoutes from './routes/stockRoutes';
import shopRoutes from './routes/shopRoutes';

const app = express();

app.use(express.json());

const startServer = async () => {
    try {
      await initializeRepositories();
      
      app.get('/', (req, res) => {
        return res.send('hello world');
      });
      
      // Products
      app.use('/api/products', productRoutes);
  
      // Stock
      app.use('/api/stock', stockRoutes)

      // Shop
      app.use('/api/shop', shopRoutes)

      app.listen(3000, () => {
        console.log('server runnin');
      });
    } catch (error) {
      console.error('server err:', error);
    }
  };
  
  startServer();