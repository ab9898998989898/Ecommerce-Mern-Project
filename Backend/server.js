import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import productRouter from './routes/productsRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import path from 'path'


// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// Middleware
app.use(express.json())
app.use(cors())


// Api endpoints
app.use('/api/user',userRouter)
app.use('/api/product', productRouter) 
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.get('/', (req, res) => res.send('Api is running...'))

app.listen(port, () => console.log(`Listening at http://localhost:${port}`)) 