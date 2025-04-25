const admin = require("./firebase/firebaseInit.js");

const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/authRoutes.js");
const cors = require("cors");
const { dbConnection } = require("./config/db.js")
const routerTask = require("./routes/taskRoutes.js")

dotenv.config();

const app = express();
const PORT = 2105;

//  CORS HABILITADOS
const corsOptions = {
    origin: [
        "http://localhost:5173", 
        "https://final-project-break-front-end-react-qeqr.onrender.com"
    ], 
    methods: ["GET", "POST", "PUT", "DELETE"],  // SOLO SE PERMITE ESTAS REQ
    allowedHeaders: ["Content-Type", "Authorization"],  // CONTENIDO HABILITADO
    credentials: true  // PERMITE COOKIE
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);
app.use("/", routerTask)

dbConnection()

app.listen(PORT, () => {
    console.log(`DB Connected Successfuly on PORT: http://localhost:${PORT}`);
});

module.exports = admin;