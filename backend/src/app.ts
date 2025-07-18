import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import quotationRoutes from './routes/quotation.routes';
import salesOrderRoutes from './routes/salesOrder.routes';
import productRoutes from './routes/product.routes';
import customerRoutes from './routes/customer.routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();

const swaggerDocument = YAML.load('./src/docs/swagger.yaml');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', authRoutes);
app.use('/quotations', quotationRoutes);
app.use('/sales-orders', salesOrderRoutes);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);

export default app;
