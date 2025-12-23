const jwt = require('jsonwebtoken');
const adminMiddleware = (req, res, next) => {
    console.log("Inside adminMiddleware");

    //get token from request headers
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);

    if (token) {
        //verify the token
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(jwtResponse);
            req.payload = jwtResponse.userMail;
            const role = jwtResponse.role;
            if(role == 'admin'){
                next();
            }else{
                res.status(401).json({ message: "Authorization failed! : Unauthorissed user!" })
            }
            
        } catch (err) {
            console.log(err);
            
            res.status(401).json({ message: "Authorization failed! : Invalid token!" })
        }
    }
    else {
        res.status(401).json({ message: "Unauthorized : Token missing!" })
    }
}

module.exports = adminMiddleware;