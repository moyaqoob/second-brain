import mongoose, { model, Schema } from "mongoose";

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1")

// User Schema
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true, minlength: 3 },
  password: { type: String, required: true }, // Hash password before saving
});

// Content Schema
const ContentSchema = new Schema({
  title: { type: String },
  link: { type: String, validate: /^https?:\/\/.+\..+/},
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  type: { type: String, enum: ["youtube","twitter","document"] },
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

// Link Schema
const LinkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true },
});

// Models
export const UserModel = model("User", UserSchema);
export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);
