const { User } = require('../models');

const signup = async (req, res) => {
    try {
        delete req.body.isAdmin; // Prevents a user from creating an admin account

        const user = new User(req.body);

        await user.save();

        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );

        const token = await user.generateAuthToken();

        res.status(200).json({token , isAdmin: user.isAdmin});
    } catch (error){
        res.status(400).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);

        await req.user.save();

        res.status(200).send({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const makeAdmin = async (req, res) => {
    try {
        const mail = req.body.email;
         
        const user = await User.findOne({ email: mail });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        user.isAdmin = true;
        await user.save();
        
        res.status(200).send({ message: "Admin status granted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginAdmin = async (req, res) => {  
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );

        if (!user.isAdmin) {
            return res.status(401).send({ error: "Not authorized to access this resource" });
        }

        const token = await user.generateAuthToken();

        res.status(200).json(token);
    } catch {
        res.status(400).json({ error: error });
    }
};

const loginByToken  =  async (req,res) => {
    try {

        const user = req.user;
        res.send(user);

    } catch (err) {
        res.status(400).json({ error: err });
    }
}

module.exports = {
    signup,
    login,
    logout,
    makeAdmin,
    loginAdmin,
    loginByToken
};