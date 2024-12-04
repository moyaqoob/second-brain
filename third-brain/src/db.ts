import mongoose, { model, Schema, Types } from  "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2")

const UserSchema =new mongoose.Schema({
    username :{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }
})

const ContentTypes=  ["image","video","article","audio"];

const ContentSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:"User",
        require:true
    },
    link:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    tags:{
        type:Types.ObjectId,
        ref:"Tags",
        require:true
    },
    type:{
        type:String,
        enum:ContentTypes,
        require:true
    }
})

const TagSchema = new Schema({
    title:{
        type:String,
        require:true,
        unique:true
    }
})

export const UserModel =  model("User",UserSchema)
export const ContentModel = model("Content",ContentSchema)
export const Tags = model("Tags",TagSchema);