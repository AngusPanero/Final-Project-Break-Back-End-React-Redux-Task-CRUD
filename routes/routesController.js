const dotenv = require("dotenv");
const admin = require("firebase-admin");

dotenv.config();

const auth = admin.auth();

const controller = {
    register: async (req, res) => {
        const { email, password } = req.body;
        console.log("REQ BODY:", req.body);

        try {
            await auth.createUser({ email, password });
            res.status(201).json({ success: true, message: "Usuario registrado correctamente" });
        } catch (error) {
            console.error("ERROR AL REGISTRAR:", error);
            res.status(500).json({ success: false, message: "Error al registrar el usuario" });
        }
    },

    login: async (req, res) => {
        console.log("DATOS RECIBIDOS REQ.BODY:", req.body);
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ success: false, message: "Token no proporcionado" });
        }

        try {
            const decodedToken = await auth.verifyIdToken(idToken);
            console.log("USUARIO VERIFICADO:", decodedToken);

            res.cookie("TOKEN", idToken, {
                httpOnly: true,
                secure: false,
            });

            res.json({ success: true });
        } catch (error) {
            console.error("TOKEN INVÁLIDO:", error);
            res.status(401).json({ success: false, message: "Token inválido" });
        }
    },

    logout: (req, res) => {
        res.clearCookie("TOKEN");
        res.json({ success: true, message: "Logout exitoso" });
    },

    dashboard: async (req, res) => {
        const user = req.user;

        if (user) {
            res.json({ success: true, message: "Bienvenido al dashboard", user: user });
        } else {
            res.status(403).json({ success: false, message: "No autorizado" });
        }
    },

    validateSession: async (req, res) =>{
        const token = req.cookies.TOKEN;

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        const userRecord = await admin.auth().getUser(decoded.uid);

        res.json({
            success: true,
            user: {
                email: userRecord.email,
                uid: userRecord.uid
            }
        });
    } catch (error) {
        console.error("Session validation failed:", error);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
    }
};

module.exports = controller;