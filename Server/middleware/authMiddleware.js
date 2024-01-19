const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
module.exports=async (req,res,next)=>{
    try {
        const token =req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findOne({_id:decoded.userid});
        req.body.user= user
        next();
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
}