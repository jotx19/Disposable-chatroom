import jwt from "jsonwebtoken";

export const generateToken = (userId, res) =>{

    const token = jwt.sign({userId}, process.env.SECRET,{
        expiresIn:"4d",
    });

    res.cookie("myToken",token,{
        maxAge: 4 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.STATUS !== "development"
    });
    return token;
};