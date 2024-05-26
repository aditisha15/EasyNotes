var jwt = require('jsonwebtoken');
const JWT_SECRET = '$ad#nbb23$nbn2@';
const User = require('../models/User');

const fetchuser = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        const user=await User.findById(data).select('-password');
        req.user=user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}
module.exports = fetchuser;