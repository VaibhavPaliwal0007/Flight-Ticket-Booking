const { User } = require('../models');

const signup = async (req, res) => {
    try {
        delete req.body.isAdmin; // Prevents a user from creating an admin account

        const user = await Author.create(req.body);

        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );

        const token = await user.generateAuthToken();

        res.status(200).send(token);
    } catch {
        res.status(400).json({ error: error });
    }
};

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);

        await req.user.save();

        res.status(200).send({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
};

// const loginAdmin = async (req, res) => {  // no need to make a seperate admin login will deal with this in middleware.
//     try {
//         const user = await User.findByCredentials(
//             req.body.email,
//             req.body.password
//         );

//         if (!user.isAdmin) {
//             return res.status(401).send({ error: "Not authorized to access this resource" });
//         }

//         const token = await user.generateAuthToken();

//         res.status(200).send(token);
//     } catch {
//         res.status(400).json({ error: error });
//     }
// };

module.exports = {
    signup,
    login,
    logout,
};