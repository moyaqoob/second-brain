import express from "express";
// import { random } from "./utils";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import cors from "cors";
import bcrypt from "bcrypt"
import { random } from "./utils";
import { Response,Request } from "express";
const app = express();
import path from "path";
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
    
}))

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});


app.post("/api/v1/signup", async (req:Request, res:Response) => {
    const username = req.body.username;
    const password= req.body.password;
    
    try{
        
        await UserModel.create({
            username: username,
            password: password
        }) 

        res.json({
            message: "User signed up"
        })
    }
    catch(e){
            res.status(411).json({
                message: "User already exists"
            })
    }
    console.log("this is running fine")
    
})

app.post("/api/v1/signin", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try{
        const existingUser:any = await UserModel.findOne({ username });
        // // Verify the password
        const verifyPassword =  bcrypt.compare(password, existingUser.password);
        // // Generate a token
        const token = jwt.sign({ id: existingUser?._id },JWT_PASSWORD);

        res.status(404).json({ username, token });
    }
    catch(e){
        res.json({
            message:"the user doesn't exist"
        })
    }    // // Find the user by username
});


app.post("/api/v1/content", userMiddleware, async (req:Request, res:Response) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
    
})

app.get("/api/v1/content", userMiddleware, async (req:Request, res:Response) => {
    const userId = req.userId;
    const content = await (await ContentModel.create({
        userId: userId,
        
    })).populate("userId", "username")
    res.json({
        content,
    })
})

app.delete("/api/v1/content", userMiddleware, async (req:Request, res:Response) => {
    const contentId = req.body.contentId;
    const id = req.params.id;
    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })
    res.json({
        message: "Deleted"
    })
    
})

app.post("/api/v1/ping",(req:Request, res:Response)=>{
    res.status(200).json({
        message:"pinged successfully"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req:Request, res:Response) => {
    const share = req.body;

    if(share){
        const hash = random(10);
        await LinkModel.create({
            userId:req.userId,
            hash
        })
        res.json({
            hash:hash,
            message:"created successfully"
        })
    }else{
        LinkModel.deleteMany({
            userId:req.userId
        })
        //since the share is not true, when sombody tries to create the share or i try to create the share. I delete the user id
        res.json({
            message:"Removed successfully"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req:Request, res:Response) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(5000);