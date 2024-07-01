import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // It's a good practice to ensure emails are unique
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: ["USER" , "ADMIN"],
  },
  userType: {
    type: String,
    enum: ["REALTOR", "HOME_SEEKER", "ADMIN"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const User = models.User || model("User", userSchema);

export default User;
