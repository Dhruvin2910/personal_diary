const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");

const users = [
    {
        id:1,
        username:"dhruvin",
        password:"1234",
    },
    {
        id:2,
        username:"manav",
        password:"1234"
    }
]

const signup = async (req, res) => {
    try{
        const {name, username, email, password} = req.body;
        const exisistingUser = await UserModel.findOne({
            $or: [{ email:email }, {username: username}]
        });
        if(exisistingUser){
            return res.status(409)
                .json({
                    success:false,
                    message:exisistingUser.email === email?
                    "User already exists":"Username already taken"
                })
        }
        //hash password
        const userModel = new UserModel({name, username, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                success:true,
                message:"User registered successfully"
            })

    }catch(err){
        console.error(err);
        return res.status(500)
            .json({
                success:false,
                message: "Internal server error"
            })
    }
}

const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await UserModel.findOne({ username });
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: "Invalid Passwprd"
            })
        }

        //Generate JWT Token
        const token = jwt.sign(
            { id: user.id || 1, username: user.username}, //payload
            process.env.SECRETE_KEY,
            {expiresIn: "1h"}  //token expires after one hour
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,   //only over https
            sameSite: "strict", //CSRF protection
            maxAge: 60*60*1000, //1 hour
        })
        res.json({
            success: true,
            message: "Logged in successfully",
            token,
            userId:users.id
        })
    }catch(err){
        console.error(err);
        return res.status(500)
            .json({
                success: false,
                message: "Internal server error"
            })
    }
}

const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({
        success:true,
        message:"Logged out successfully"
    })
}

module.exports = { login, signup, logout }