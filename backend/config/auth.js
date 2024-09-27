import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({
    path: "../.env"
})

const isAuthenticated = async(req,res,next) => {
    try{                
        const {token} = req.cookies;                    
        if(!token) {
            res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }        
        const decode = jwt.verify(token,process.env.SECRET_KEY);                
        req.user = decode.userId;        
        next();
    } catch(error) {
        console.log("error--", error);
    }
}

export default isAuthenticated;