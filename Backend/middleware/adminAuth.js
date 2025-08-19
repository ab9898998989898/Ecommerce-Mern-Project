import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers; 
        if (!token) {
            return res.json({ message: "Unauthorized", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ message: "Unauthorized", success: false });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error", success: false });
    }
}

export default adminAuth;