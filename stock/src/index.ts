import express from 'express';
import productRoutes from './routes/productRoutes';
import { initializeRepositories } from './repository/repositories';

const app = express();

app.use(express.json());

const startServer = async () => {
    try {
      await initializeRepositories();
      
      app.get('/', (req, res) => {
        return res.send('hello world');
      });
    
      app.use('/api/products', productRoutes);
  
      app.listen(3000, () => {
        console.log('server runnin');
      });
    } catch (error) {
      console.error('server err:', error);
    }
  };
  
  startServer();