 import Jwt  from "jsonwebtoken";
 
 const generateToken = (userId: string, name:string | undefined, email:string | undefined, role:string | undefined):any => {
  try {
    
  let secretKey=process.env.SECRET_KEY || undefined
  if(secretKey===undefined){
   return null
  }
    else{
        if(userId===undefined || name===undefined || email===undefined && role===undefined){
        return null
        }
        else{
          console.log(secretKey)
            const Jwttoken = Jwt.sign({ userId, name, email, role}, secretKey, { expiresIn: '24h' });
            return Jwttoken;
        }
    }
    
  } catch (error) {
    return null
  }
  }
  export default generateToken