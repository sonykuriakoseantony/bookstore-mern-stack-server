//api requests related to user operations

//Register a new user
exports.registerController = (req, res) => {
    console.log("Inside registerController");

    const { username, email, password } = req.body;
    console.log(username, email, password);
    
    res.status(200).json({ message : "User registered succesfully"})
}

//Login an existing user

//User profile edit

//Admin profile edit

