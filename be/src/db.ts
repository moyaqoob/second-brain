
import mongoose, {model, Schema} from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1")

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})


const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const UserModel = model("User", UserSchema);
export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);