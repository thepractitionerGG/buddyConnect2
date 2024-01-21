const UserModel = require("../models/userModel");
const router = require("express").Router();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");


// user registration

router.post("/register", async (req, res) => {
    try {
        //check if user alreday exist
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(200).send({
                success: false,
                message: "User Alreday Exist",
            });
        }

        // create new user
        const hashedPassword = await bycrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(200).send({
            success: true,
            message: "New user created successfully",
        });
    }

    catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

// user login

router.post("/login", async (req, res) => {
    try {
        //check if user exist 
        const user = await UserModel.findOne({
            email: req.body.email
        });
      
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist"
            });
        }

        const validPassword = await bycrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid Password"
            });
        }

        // create and assign a token
        const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET,{expiresIn:"1d",});
        res.send({
            success: true,
            message: "User logged in successfully",
            data: token
        });
    }
    catch (error) {
        res.send({
            message: error.message,
            success: false,
        })
    };
});

// get current user

router.get("/get-current-user",authMiddleware,async(req,res)=>{
    try {
        let user = req.body.user
        if(user){
            res.send({
                success:true,
                message:"User Feteched Successfully",
                data:user,
              });
        }else{
            throw Error('Not Found')
        }
    } catch (error) {
        res.send({
            message:error.message,
            success:false,
        });
    }
})


//GET All User

router.get('/allUsers' , authMiddleware , async (req , res)=>{
    try {
        let currUser =  req.body.user
        let allUsers =  await UserModel.find({_id:{$ne:currUser._id}})
        if(allUsers.length>0){
            return res.status(200).send({
                success:true,
                data:allUsers
            })
        }else{
            return res.status(404).send({
                success:false,
                message:'No user found'
            })
        }
    } catch (error) {
        console.log('Error in GetAll Users', error);
        res.status(500).send({
            success:false,
            message:'Some error Occured'
        })
    }
})

module.exports = router;
