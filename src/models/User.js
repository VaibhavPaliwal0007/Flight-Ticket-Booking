const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },

    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (
                value.toLowerCase().includes("123") ||
                value.toLowerCase().includes("0000")
            ) {
                throw new Error("Please enter a strong password!!");
            }
        },
    },

    phoneNo: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },

    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FlightDetail",
        },
    ],

    tokens: [
        {
            token: {
                type: String,
                required: false,
            },
        },
    ],

    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
 };

 userSchema.statics.findByCredentials = async function (email, password) {
    if (!email || !password) {
        throw new Error("Please provide email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return author;
};

userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;