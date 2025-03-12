import express from "express";
// import { random } from "./utils";
import bcrypt from "bcrypt";
import cors from "cors";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { JWT_PASSWORD } from "./config";
import { ContentModel, LinkModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  })
);

app.use(express.json());

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Catch-all route for SPA
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});
app.use(cors());


app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
console.log("signup page")
  try {
    await UserModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: "User signed up",
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists",
    });
  }
  console.log("this is running fine");
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const existingUser: any = await UserModel.findOne({ username });
    // // Verify the password
  
    // // Generate a token
    const token = jwt.sign({ id: existingUser?._id }, JWT_PASSWORD);

    res.status(404).json({ username, token });
  } catch (e) {
    res.json({
      message: "the user doesn't exist",
    });
  } // // Find the user by username
});

app.post(
  "/api/v1/content",
  userMiddleware,
  async (req: Request, res: Response) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
      link,
      type,
      title: req.body.title,
      userId: req.userId,
      tags: [],
    });

    res.json({
      message: "Content added",
    });
  }
);

app.get(
    "/api/v1/content",
    userMiddleware,
    //@ts-ignore
  async (req: Request, res: Response) => {
    try {
      // Extract username from request, e.g., via query params
      const userId = req.userId;

      // Find all content associated with the userId
      const content = await ContentModel.find({ userId }).populate(
        "userId",
        "username"
      );

      // Check if content exists
      if (!content || content.length === 0) {
        return res
          .status(404)
          .json({ error: "No content found for this user" });
      }
      console.log(content);
      res.json({
        content,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.delete(
  "/api/v1/content",
  userMiddleware,
  async (req: Request, res: Response) => {
    const contentId = req.body.ObjectId;
    const id = req.params.id;
    console.log(contentId);
    await ContentModel.deleteOne({
      contentId,
      userId: req.userId,
    });
    res.json({
      message: "Deleted",
    });
  }
);

app.post("/api/v1/ping", (req: Request, res: Response) => {
  res.status(200).json({
    message: "pinged successfully",
  });
});

app.post("/",(req,res)=>{
    res.json("fjseinrbgwjoe").status(200);
    console.log("nekfnwewne")
})
app.post(
  "/api/v1/brain/share",
  userMiddleware,
  async (req: Request, res: Response) => {
    const share = req.body;
    try {
      if (share) {
        const hash = random(10);
        await LinkModel.create({
          userId: req.userId,
          hash,
        });
        res.json({
          hash: hash,
          message: "created successfully",
        });
      } else {
        LinkModel.deleteMany({
          userId: req.userId,
        });
        //since the share is not true, when sombody tries to create the share or i try to create the share. I delete the user id
        res.json({
          message: "Removed successfully",
        });
      }
    } catch (e) {
      res.json(404).json("error occured");
    }
  }
);

app.get("/api/v1/brain/:shareLink", async (req: Request, res: Response) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: "Sorry incorrect input",
    });
    return;
  }
  // userId
  const content = await ContentModel.find({
    userId: link.userId,
  });

  console.log(link);
  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(411).json({
      message: "user not found, error should ideally not happen",
    });
    return;
  }

  res.json({
    username: user.username,
    content: content,
  });
});

app.listen(5001);
