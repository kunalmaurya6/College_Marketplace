import jwt from "jsonwebtoken";
import User from "../../models/model/user.js";

const getAdminEmails = () => {
    return (process.env.ADMIN_EMAILS || "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
};

export const isAdminUser = (user) => {
    if (!user) {
        return false;
    }

    return user.role === "admin" || getAdminEmails().includes(user.email);
};

const getToken = (req) => {
    const authHeader = req.headers.authorization || "";

    if (authHeader.startsWith("Bearer ")) {
        return authHeader.slice(7);
    }

    return req.cookies?.token;
};

const requireAuth = async (req, res, next) => {
    try {
        const token = getToken(req);

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Invalid authentication token" });
        }

        req.isAdmin = isAdminUser(user);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const requireAdmin = (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
    }

    next();
};

export default requireAuth;
