import mongoose from "mongoose";


const connectDB = async ()=>{
    
    mongoose.connection.on('connected',()=>{
        console.log("Db is connected");
        
    })
    
    await mongoose.connect(`${process.env.MONGODB_URL}/ecommerce`)

}

export default connectDB;