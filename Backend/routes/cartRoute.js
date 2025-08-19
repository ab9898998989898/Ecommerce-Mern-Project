import express from 'express';
import { addToCart,getUserCart,updateCart } from '../controllers/cartControler.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add',authUser,addToCart);
cartRouter.put('/update',authUser,updateCart);
cartRouter.post('/get',authUser,getUserCart);

export default cartRouter;
