import mongoose, { Schema, Document } from "mongoose";

// Create a user interface
interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

// Create user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// Create and export the User model
const UserModel = mongoose.model<User>("User", userSchema);

export {UserModel, User};
