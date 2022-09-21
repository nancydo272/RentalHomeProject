require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_KEY;

const register = async (req,res) => {
    try{
        const user = new User(req.body);
        const newUser = await user.save();
        console.log("User saved successfully", newUser);
        const userToken = jwt.sign(
            {
                _id:newUser._id,
                email:newUser.email,
                firstName:newUser.firstName,
                lastName:newUser.lastName,
            },
            SECRET,
        );
        console.log('TOKEN::' , userToken);
        res
            .status(201)
            .cookie('userToken', userToken,{expires: new Date(Date.now() + 1000000),})
            .json({
                successMessage: 'User saved successfully', 
                user: {
                    _id:newUser._id,
                    email:newUser.email,
                    firstName:newUser.firstName,
                    lastName:newUser.lastName,
                },
            });
    }   catch(err){console.log('error user register', err);res.json(err);}
};

const login = async(req,res)=> {
    const userFile = await User.findOne({email: req.body.email});
    if(!userFile){
        res.status(400).json({message: "Wrong password or email"});
    }else{
        try{
            const validPw = await bcrypt.compare(req.body.password, userFile.password)
            if(!validPw){
                res.status(400).json({message: "Wrong password or email"});
            }else{
                const userToken = jwt.sign(
                    {
                        _id:userFile._id,
                        email:userFile.email,
                        firstName:userFile.firstName,
                        lastName:userFile.lastName,
                    },
                    SECRET,
                );
                console.log('TOKEN::' , userToken);
                res
                    .cookie('userToken', userToken,{expires: new Date(Date.now() + 100000),})
                    .json({
                        successMessage: 'User login successfully', 
                        user: {
                            email:userFile.email,
                            firstName:userFile.firstName,
                            lastName:userFile.lastName
                        },
                    });
            }
        }   catch(e){
            console.log("login error", e)
            res.status(400).json({message: "Wrong password or email"});
        }
    }
};
const logout = (req, res) => {
    res.clearCookie('userToken');
    res.json(({message: 'User logged out successfully'}));
};
const getLogUser = async (req,res) => {
    try{
        const userLoad = jwt.verify(req.cookies.userToken, SECRET);
        const user = await loginUser.findOne({_id: userLoad._id });
        res.json(user);
    }   catch(err){
        console.log("error getting user", err);
        res.status(400).json({ err });
    }
};
const updateUser = (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true,
    })
    .then((updatedUser) => {
        res.json({updatedUser});
    })
    .catch((err) => {
        res.status(400).json({err});
    });
};

module.exports = {register,login,logout,getLogUser,updateUser};