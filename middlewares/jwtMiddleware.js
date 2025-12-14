const jwt = require('jsonwebtoken');
const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwtMiddleware");

    //get token from request headers
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    if (token) {
        //verify the token
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(jwtResponse);
            req.payload = jwtResponse.userMail;
            next();
        } catch (err) {
            res.status(401).json({ message: "Authorization failed! : Invalid token" })
        }

    }
    else {
        res.status(401).json({ message: "Unauthorized : No toke provided" })
    }


}

module.exports = jwtMiddleware;