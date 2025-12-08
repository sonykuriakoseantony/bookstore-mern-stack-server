//api requests related to user operations

const users = require("../models/userModel");

//Register a new user
exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { username, email, password } = req.body;
    // console.log(username, email, password);
    // res.status(200).json({ message : "User registered succesfully"})

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User already exists. Please login ")
        }
        else{
            const newUser = await users.create({
                username, email, password 
            })
            res.status(200).json(newUser);
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//Login an existing user

//User profile edit

//Admin profile edit

