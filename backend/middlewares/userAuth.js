import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default userAuth;
