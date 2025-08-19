import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


// Gloabl variables
const currency = 'pkr'
const deliveryCharges = 10; // Example delivery charges, adjust as necessary


// gateway intialization

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);




// Placing orders using cod method

const placeOrder = async (req,res)=>{

    try {

        const userId = req.userId;
        const {items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message:"Order Placed Successfully"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}




// Placing orders using stripe method

const placeOrderStripe = async (req,res)=>{

    try {

        const userId = req.userId;
        const {items, amount, address} = req.body;
        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data: {
                currency:currency,
                product_data:{
                    name:item.name,
                },
                unit_amount: item.price*100,
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data: {
                currency:currency,
                product_data:{
                    name:"Delivery Charges",
                },
                unit_amount: deliveryCharges*100,
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({success:true, session_url:session.url})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }

}

// Verify Stripe Payment
const verifyStripePayment = async (req, res) => {

    const userId = req.userId;
    const {orderId , success} = req.body;

    try {
        
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({success:true, message:"Payment Successful and Order Placed"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.jso({success:false, message:"Payment Failed and Order Not Placed"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }

}


// Placing orders using jazzcash method
const placeOrderJazzcash = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    // req.file comes from multer (the uploaded screenshot)
    const screenshotUrl = req.file ? `/uploads/screenshots/${req.file.filename}` : null;

    const orderData = {
      userId,
      items: JSON.parse(items), // since frontend sends it as FormData (stringified JSON)
      amount,
      address: JSON.parse(address),
      paymentMethod: 'JazzCash',
      payment: false,
      screenshot:screenshotUrl, // store filename reference in DB
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const user = await userModel.findById(userId);
    user.cartData = {}; // update cartData property
    await user.save(); // save changes to user document

    res.json({ success: true, message: 'JazzCash Order Placed Successfully' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



// All Orders Data For Admin Panel
const allOrders = async (req,res)=>{

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true, orders})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }

}


// User Orders Data For Admin Panel
const userOrders = async (req,res)=>{
    
    try {
        
        const userId = req.userId;

        const orders = await orderModel.find({userId})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})   
    }

}


// Update Orders Status From Admin Panel
const updateStatus = async (req,res)=>{

    try {
        const {orderId, status} = req.body;

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true, message:"Order Status Updated Successfully"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }


}


export {
    placeOrder,
    placeOrderStripe,
    placeOrderJazzcash,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripePayment
}