import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms (7 days)
        httpOnly: true, // cannot be accessed by XSS and JS attacks
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development" // cookie will only be set in https in production
    })
    return token
}
