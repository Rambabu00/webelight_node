import bcrypt from "bcrypt"

const comparePassword = async (password: string, hashedPassword: string| undefined): Promise<boolean> => {
    if(hashedPassword===undefined){
        return false
    }
    
else{
    return bcrypt.compare(password, hashedPassword);
}
  };
  export default comparePassword