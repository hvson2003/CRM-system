import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 

import { verifyToken, checkRole } from './utils/auth.js';
import authRouter from './routes/auth.routes.js';
import customerRouter from './routes/customer.routes.js';
import productRouter from './routes/product.routes.js';

import buildAdminRouter from './admin.js';

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/customers', verifyToken, checkRole(['Admin']), customerRouter);
app.use('/api/products', verifyToken, checkRole(['Admin']), productRouter);

buildAdminRouter(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
