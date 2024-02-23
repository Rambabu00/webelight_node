 
import mongoose, {Schema, Document} from "mongoose";

interface product extends Document{
    Admin_id:string,
    product_name:string,
    product_category: string,
    product_brand:string
    price:number
}
const productSchema=new Schema({
    Admin_id:{
        type:String,
        require:true
    },
    product_name:{
        type:String,
        require:true
    },
    product_category:{
        type:String,
        require:true
    },
    product_brand:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
})
const productModel= mongoose.model <product>("products", productSchema) 
export {productModel, product}
  