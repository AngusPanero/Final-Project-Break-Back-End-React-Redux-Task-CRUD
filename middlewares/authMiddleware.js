const admin = require("firebase-admin")

const authMiddleware = async (req, res, next) => {
    const idToken = req.cookies.TOKEN

    if(!idToken){
        res.status(401).json({ success: false, message: "Token no Proporcionado" })
    }

    try {
        const decodedToken = await auth.verifyIdtoken(idToken)
        req.user = decodedToken
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Token inválido o expirado" });
    }
}

module.exports = authMiddleware;