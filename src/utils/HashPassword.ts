import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()
dotenv.config();

const HashPassword = async (password: string): Promise<string> => {
  const saltRounds = process.env.HASH_SALT_ROUND
    ? parseInt(process.env.HASH_SALT_ROUND)
    : 10; // Default to 10 if HASH_SALT_ROUND is not set

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword: string = await bcrypt.hash(password, salt);

  return hashedPassword;
};

 

export default HashPassword