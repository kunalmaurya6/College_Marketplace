import User from "../../models/model/user.js";
import secretToken from "./SecretTocken.js";
import bcrypt from "bcrypt";
import userValidationSchema from "../../models/validation/userValidation.js";
import express from 'express';
import jwt from 'jsonwebtoken'
import requireAuth, { isAdminUser } from "./authMiddleware.js";

const authRoute = express.Router();

const buildAuthResponse = (user, token) => ({
    token,
    user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: isAdminUser(user) ? "admin" : "user",
    },
});

authRoute.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const { error, value } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details.map(err => err.message)
            });
        }
        const { password } = value;
        const email = value.email.trim().toLowerCase();
        const username = value.username.trim();
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: "Email or username already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashPassword, username });
        const token = secretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
            sameSite: "lax",
        });
        res
            .status(201)
            .json({ message: "User signed up successfully", success: true, ...buildAuthResponse(user, token) });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Signup failed" });
    }
}
);

authRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Incorrect password or email' })
        }

        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.status(401).json({ message: 'Incorrect password or email' })
        }
        const token = secretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
            sameSite: "lax",
        });
        res
            .status(200)
            .json({ message: "User logged in successfully", success: true, ...buildAuthResponse(user, token) });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Login failed" });
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

authRoute.get('/me', requireAuth, (req, res) => {
    res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            role: req.isAdmin ? "admin" : "user",
        },
    });
});

authRoute.post('/logout', (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

export default authRoute
