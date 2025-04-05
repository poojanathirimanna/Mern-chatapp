import jwt from 'jsonwebtoken';
export const generateToken = (userId , res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,// Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV !== "development",// Ensures the cookie is sent over HTTPS only
        sameSite: "strict",// Helps prevent CSRF attacks
    });
    return {token};
}

