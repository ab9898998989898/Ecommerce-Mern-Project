import express from 'express'
import {placeOrder, placeOrderStripe, verifyStripePayment , placeOrderJazzcash, allOrders, userOrders, updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js' 
import authUser from '../middleware/auth.js'
import upload from '../middleware/multer.js'


const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/jazzcash', authUser, upload.single("screenshot"), placeOrderJazzcash)



// User Features
orderRouter.post('/userorders',authUser,userOrders)

// Verify Payment
orderRouter.post('/verifyStripe',authUser,verifyStripePayment)


export default orderRouter