import {UserModel} from "../model/UserSchema";
import Joi from "joi";
import {Request, Response} from "express"
import userAlreadyExist from "../utils/userAlreadyExist";
import HashPassword from "../utils/HashPassword";
import comparePassword from "../utils/CompareHashPaaword";
import generateToken from "../utils/JwtTokenCreation";
const register=async (req:Request ,res:Response)=>{
 const isvalid= Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().alphanum().min(6).max(20).required(),
    role:Joi.string().required(),
 }).validate(req.body)
  try {
    if(!isvalid.error){
        if(req.body.role==="admin" || req.body.role==="customer"){
            
       const userData= await userAlreadyExist(req.body.email, req.body.role)
       console.log(userData)
       if(userData.message){
        res.status(300).send({
        "message":"email exists so go and login"
        })
       }
       else{
        // Hash a password
        const hashPassword = await HashPassword(req.body.password)
        const obj=new UserModel({
            "name":req.body.name,
            "email": req.body.email,
            password:hashPassword,
            role: req.body.role
        })
        await obj.save();
        res.status(200).send({
            "message":"successfuly registered..."
            })
       }
        }
        else{
            res.status(400).send({
                "message":"you entered role is wrong"
                }) 
        } 
    }
    else{
     
        res.status(400).send({
            "message":"data error",
            "data": isvalid.error.message
            })
    }
  } catch (error) {
    res.status(404).send({
        "message":"error occured",
        "data":error
        })
  }
}
const login= async (req:Request, res:Response) =>{
    const isvalid= Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().alphanum().min(6).max(20).required(),
        role:Joi.string().required(),
     }).validate(req.body)
     try {
        if(!isvalid.error){
        if(req.body.role==="admin" || req.body.role==="customer"){
            
            const userData=await userAlreadyExist(req.body.email, req.body.role);
            if(userData.message){
               const ishashedPasswordTrue= await comparePassword(req.body.password,userData.data?.password)
               if(ishashedPasswordTrue){
                  const token=generateToken(userData.data?._id, userData.data?.name, userData.data?.email, userData.data?.role)
                  if(token!==null){
                   res.status(200).send({
                       "message":`successfuly login as ${userData.data?.role}...`,
                       "token":token
                       })
                  }
                  else{
                   res.status(200).send({
                       "message":"something wrong during token creation",
                       "token":token
                       })
                  }
               }
               else{
                   res.status(300).send({
                       "message":"you entered wrong password"
                       })
               }
            }
            else{
               res.status(300).send({
                   "message":"you entered wrong Email check once or may be you are trying to entered into wrong role"
                   })
            }
        }
        else{
            res.status(400).send({
                "message":"you entered wrong role"
                })
        }
        }
        else{
            res.status(400).send({
                "message":"data error",
                "data": isvalid.error.message
                })
        }
     } catch (error) {
        res.status(404).send({
            "message":"error occured",
            "data":error
            })
     }
}
export {register, login}