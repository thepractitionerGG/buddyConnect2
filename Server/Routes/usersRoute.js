const User = require("./models/userModel");
const router = require("express").Router();
const jwt = require("jasonwebtoken");
const bycrypt  = require("bycrypt.js");


// user registration

router.post("./register",async(req,res)=>{
    try{
        //check if user alreday exist
        const user =    await user.findOne({email:req.body.email});
        if(user){
            return res.send({
                success:false,
                message:"User Alreday Exist",
            });
        }

        // create new user
        const hashedPassword = await bycrypt.hash(req.body.password,10);
        req.body.password=hashedPassword;
        const newUser=new User(req.body);
        await newUser.save();
        req.send({
            success:true,
            message:"New user created successfully",
        });
    }

    catch(error){
        res.send({
            message:error.message,
            success:false,
        });
    }
});

// user login

router.post("./login",async(req,res)=>{
    try{
        //check if user exist 
        const user = await user.findOne({
            email: req.body.email
        });

        if(!user){
            return res.send({
                success:false,
                message:"User does not exist"
            });
        }

        const validPassword = await bcrypt.compare(req.body.password,user.password);

        if(!validPassword){
            return res.send({
                success: false,
                message:"Invalid Password"
            });
        }

        // create and assign a token
        const token = jwt.sign({userid:user_id},process.env.JWT_SECRET);
        req.send({
            success:true,
            message:"User logged in successfully",
            data:token
        });
    }
    catch(error){
        res.send({
            message: error.message,
            success:false,
        })
    };
});

moudle.exports=router;
