import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'



// Function for adding products 

const addProducts = async (req, res) => {
    try {see 
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1?.[0];
        const image2 = req.files.image2?.[0];
        const image3 = req.files.image3?.[0];
        const image4 = req.files.image4?.[0];

        const images = [image1,image2, image3, image4].filter((item)=>item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            price:Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            date: Date.now(),
            bestseller: bestseller  === 'true'? true : false
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ message: "Product added successfully", success: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}






// Function for list products
const listProducts = async (req, res) => {

    try{

        const products = await productModel.find({});
        res.json({ products, success:true });
    }catch(error){
        console.log(error);
        res.json({ message: "Internal server error" ,success:false  });
    }

}



// Function for removing products
const removeProducts = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ message: "Product removed successfully", success: true });
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error", success: false });
    }
}


// Function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const {productId} = req.body
        const product = await productModel.findById(productId);
        res.json({ product, success: true });

    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error", success: false });
    }
}

export { addProducts, listProducts, removeProducts, singleProduct }