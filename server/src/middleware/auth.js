const jwt = require('jsonwebtoken')

const { User } = require('../models');

const validateSession = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;

        next();
    } catch (err) {
        res.status(401).send({ error: "Please authenticate." });
    }
};

const validateAdminSession = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user || !user.isAdmin) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
    } catch (err) {
        res.status(401).send({ error: "Please authenticate." });
    }
};

module.exports = {
    validateSession, 
    validateAdminSession
}; 