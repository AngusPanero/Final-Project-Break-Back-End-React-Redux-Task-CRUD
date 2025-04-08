const admin = require("firebase-admin");
const path = require('path');

const serviceAccountPath = path.join(__dirname, './config/final-project-break-firebase-adminsdk-fbsvc-bb070d5860.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
}); // TODO LO DE ACÁ ARRIBA ES PARA CONECTAR FIREBASE CON EL JSON DESCARGABLE Y NO DESDE EL .ENV

const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/authRoutes.js");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = 2105;

//  CORS HABILITADOS
const corsOptions = {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],  // SOLO SE PERMITE ESTAS REQ
    allowedHeaders: ["Content-Type", "Authorization"],  // CONTENIDO HABILITADO
    credentials: true  // PERMITE COOKIE
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);

app.listen(PORT, () => {
    console.log(`DB Connected Successfuly on PORT: http://localhost:${PORT}`);
});