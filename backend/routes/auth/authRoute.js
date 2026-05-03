import User from "../../models/model/user.js";
import secretToken from "./SecretTocken.js";
import bcrypt from "bcrypt";
import userValidationSchema from "../../models/validation/userValidation.js";
import express from 'express';
import jwt from 'jsonwebtoken'

const authRoute = express.Router();

authRoute.post('/signup', async (req, res) => {
    try {
        const { error, value } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details.map(err => err.message)
            });
        }
        const { email, password, username } = value;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashPassword, username });
        const token = secretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });

    } catch (error) {
        console.error(error);
    }
}
);

authRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ message: 'All fields are required' })
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.json({ message: 'Incorrect password or email' })
        }

        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const token = secretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(200)
            .json({ message: "User logged in successfully", success: true });

    } catch (error) {
        console.error(error);
    }
}
);

authRoute.post('/', (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await User.findById(data.id)
            if (user) return res.json({ status: true, user: user.username })
            else return res.json({ status: false })
        }
    })
}
);

export default authRoute