const admin = require("../firebase/firebaseInit");

const authTaskUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split("Bearer ")[1]
        : null;

    console.log("🟡 Middleware ejecutado");
    console.log("🧾 Header Authorization crudo:", authHeader);
    console.log("🧪 Token extraído:", token);

    if (!token) {
        console.log("❌ Token no proporcionado");
        return res.status(401).json({ success: false, message: "Token no Proporcionado" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("✅ Token verificado:", decodedToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("❌ Error al verificar token:", error);
        return res.status(401).json({ success: false, message: "Token inválido" });
    }
};

module.exports = authTaskUser;