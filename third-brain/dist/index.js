"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("./config");
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = 10;
    bcrypt_1.default.hash(password, salt, function (err, hash) {
        db_1.UserModel.create({
            username: username,
            password: password
        });
    });
    try {
        res.json({
            message: "User signed up successfully"
        });
    }
    catch (e) {
        res.json({
            message: "Invalid Credentials"
        });
    }
});
app.post("/api/v1/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = db_1.UserModel.find({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            username: existingUser,
        }, config_1.JWT_PASSWORD);
        res.json({
            username: token
        });
    }
    else {
        res.json({
            message: "Invalid credentials"
        });
    }
    if (!existingUser) {
        res.json({
            message: "User does not exist, You need to sign up"
        });
    }
});
app.post("/api/v1/content", (req, res) => {
});
app.get("/api/v1/content", (req, res) => {
});
app.delete("/api/v1/delete", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:sharelink", (req, res) => {
});
app.listen(3000);
