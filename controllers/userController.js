//api requests related to user operations

const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Register a new user
exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { username, email, password } = req.body;
    // console.log(username, email, password);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(409).json("Account already exists. Please register using different email address!");
        }
        else {
            const newUser = await users.create({
                username, email, password
            })
            res.status(200).json(newUser);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//Login an existing user
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body;
    // console.log(username, email, password);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (password == existingUser.password) {
                const token = jwt.sign({ userMail : existingUser.email, role : existingUser.role }, process.env.JWT_SECRET_KEY)
                res.status(200).json({ user : existingUser, token })
            }
            else {
                res.status(401).json("Incorrect Email / Password!!")
            }
        }
        else {
            res.status(404).json("Account already exists. Please register using different email address!");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//Google login controller
exports.googleLoginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password, username, picture } = req.body;
    // console.log(email, password, username, picture);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            // login
            const token = jwt.sign({ userMail : existingUser.email, role : existingUser.role }, process.env.JWT_SECRET_KEY)
            res.status(200).json({ user : existingUser, token })

        }
        else {
            //register
            const newUser = await users.create({
                username, email, password, picture
            })
            const token = jwt.sign({ userMail : newUser.email, role : newUser.role }, process.env.JWT_SECRET_KEY)
            res.status(200).json({ user : newUser, token })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//User profile edit
exports.editUserProfileController = async (req, res) => {
    console.log("Inside editUserProfileController");
    //get user details from req body
    const email = req.payload;
    const { id } = req.params;
    const { username, password, bio, role, picture } = req.body;
    const updatePicture = req.file?req.file.filename:picture;

    console.log(id, email, username, password, bio, role, picture, updatePicture );

    try{
        const updateUser = await users.findByIdAndUpdate({_id : id }, {username, email, password, picture:updatePicture, bio, role }, {new : true});
        res.status(200).json(updateUser)
    }
    catch{
        res.status(500).json(error)
    }
}

//Admin profile edit



