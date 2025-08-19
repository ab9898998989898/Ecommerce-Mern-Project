import userModel from "../models/userModel.js";

// add products to user cart 
const addToCart = async (req,res)=>{
    try {
        
        const userId = req.userId; // Get userId from auth middleware
        const {itemId, size} = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        let cartData = userData.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]++;
            }else{
                cartData[itemId][size] = 1;
            }
        } else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }


        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true, message:"Product added to cart successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}
// update products to user cart 
const updateCart = async (req,res)=>{

    try {
        
        const userId = req.userId; // Get userId from auth middleware
        const {itemId, size, quantity} = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        let cartData = userData.cartData;
        cartData[itemId][size] = quantity;
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true, message:"Product updated in cart successfully"});


    } catch (error) {
         console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }


}
// get user cart data 
const getUserCart = async (req,res)=>{

    try {
        
        const userId = req.userId; // Get userId from auth middleware
        const userData = await userModel.findById(userId);
        if (!userData) {
            // This case is important for new users or if something goes wrong
            return res.status(404).json({ success: false, message: "User not found." });
        }
        let cartData = userData.cartData;

        res.json({success:true, cartData, message:"User cart data fetched successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }


}


export {
    addToCart,
    updateCart,
    getUserCart
}