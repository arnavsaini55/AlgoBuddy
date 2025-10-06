import jwt from "jsonwebtoken";

 export const verifytoken = (req,res,next) =>{
    const token = req.headers["authorization"];
    const Token = token && token.split(" ")[1];
    if(!Token){
        return res.status(401).json({message: "Access denied. No token provided."});
    }
    try {
         const decoded = jwt.verify(Token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(403).json({ message: "Invalid token" }); 
    }
}