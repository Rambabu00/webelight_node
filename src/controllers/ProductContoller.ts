import { Request, Response } from "express"
import Joi from "joi"
import { productModel } from "../model/ProductSchema";
import { CustomRequest } from "../middleware/Auth";
const PostProduct = async( req:CustomRequest, res:Response)=>{
    const isvalid= Joi.object({
        product_name:Joi.string().required(),
        product_category:Joi.string().required(),
        product_brand:Joi.string().required(),
        price:Joi.number().required()
     }).validate(req.body)
     if(isvalid.error){
        return  res.status(400).send({
            "message":"data error",
            "data": isvalid.error.message
            })
     }
     // is isvalid have no errors
     try {
    
         const obj=new productModel({
            Admin_id:req.user.userId,
            product_name:req.body.product_name,
            product_category: req.body.product_category,
            product_brand: req.body.product_brand,
            price:req.body.price
         })
         await obj.save();
         console.log(obj)
         return  res.status(200).send({
            "message":"successfuly posted the product detials",
            })
     } catch (error) {
        return  res.status(404).send({
            "message":"error",
            "data": error
            })
     }

}
const AllProducts = async (req:CustomRequest, res:Response) =>{
try {
   let page= Number(req.query.page) || 1;
   let LIMIT= 10;
   if(page<=0)
   {
      return res.status(400).send({
         "message":"you entered into wrong page number and page number starts from 1"
      })
   }
  const data= await productModel.find().sort().skip((page-1)*LIMIT).limit(LIMIT);
  if(data.length>0){
   return  res.status(200).send({
      "message":"successfuly fetched data",
      "data": data
      })
   }
     if(page>1){
      return  res.status(200).send({
         "message":`there is no data for ${page} page`,
         "data": data
         })
     }
     else{
      return  res.status(200).send({
         "message":"there is no data in DataBase",
         "data": data
         })
     }
  
} catch (error) {
   return  res.status(404).send({
      "message":"error",
      "data": error
      })
}
}
const getAllAdminProducts = async (req:CustomRequest, res:Response) =>{
     try {
      console.log(req.query.page)
      let page= Number(req.query.page) || 1;
      let LIMIT= 10;
      console.log(page)
      if(page===0 || page<0){
         return res.status(400).send({
            "message":"you entered into wrong page number and page number starts from 1"
         })
      }
     const data= await productModel.find({Admin_id:req.user.userId}).sort().skip((page-1)*LIMIT).limit(LIMIT);
 
      if(data.length>0){
         return  res.status(200).send({
            "message":"successfuly fetched data",
            "data": data
            })
         }
         if(page>1){
            return  res.status(200).send({
               "message":`there is no data for ${page} page`,
               "data": data
               })
           }
           else{
            return  res.status(200).send({
               "message":"Admin not posted any product data into Database",
               "data": data
               })
           }
     } catch (error) {
      return  res.status(404).send({
         "message":"error",
         "data": error
         })
     }
}
const filterProducts= async (req:Request, res:Response) =>{
      
   const { name, brand, price, category } = req.query;

   // Build the filter object based on the provided query parameters
   const filter: any = {};

   if (name) {
     filter.product_name = name;
   }

   if (brand) {
     filter.product_brand = brand;
   }
if(category){
   filter.product_category=category
}
  
    if(price){
      filter.price=price
    }  
     try {
      const filterData=await productModel.find(filter)
     if(filterData.length>0){
      return  res.status(200).send({
         "message":"fetched",
         "data": filterData
         })
     }
     return  res.status(200).send({
      "message":"no filter data based on your filters",
      "data": filterData
      })
     } catch (error) {
      
      return  res.status(404).send({
         "message":"error",
         "data": error
         })
     }
}
const updateProduct = async (req:CustomRequest, res:Response) =>{
       try {
         if(!req.params.product_id){
            return  res.status(400).send({
               "message":"product id is not passed"
               })
         }
         const productData=await productModel.findById(req.params.product_id);
         if(!productData){
            return  res.status(400).send({
               "message":"product id is not exist"
               })
         }
         if(productData.Admin_id===req.user.userId){
             await productModel.findByIdAndUpdate(req.params.product_id, req.body)
             return  res.status(400).send({
               "message":"successfuly updated"
               })
         }
         return  res.status(500).send({
            "message":"unauthorized - u can't update others product data"
            })
           
       } catch (error) {
         return  res.status(404).send({
            "message":"error",
            "data": error
            })
       }
}
const deleteProduct = async (req:CustomRequest, res:Response) =>{
   try {
      if(!req.params.product_id){
         return  res.status(400).send({
            "message":"product id is not passed"
            })
      }
      const productData=await productModel.findById(req.params.product_id);
      if(!productData){
         return  res.status(400).send({
            "message":"product id is not exist"
            })
      }
      if(productData.Admin_id===req.user.userId){
          await productModel.findByIdAndDelete(req.params.product_id)
          return  res.status(400).send({
            "message":"successfuly deleted"
            })
      }
      return  res.status(500).send({
         "message":"unauthorized - u can't update others product data"
         })
        
    } catch (error) {
      return  res.status(404).send({
         "message":"error",
         "data": error
         })
    }
}
export {PostProduct, AllProducts, getAllAdminProducts, filterProducts, updateProduct, deleteProduct}