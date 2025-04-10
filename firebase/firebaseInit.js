const admin = require("firebase-admin");
const path = require('path');

const serviceAccountPath = path.join(__dirname, '../config/final-project-break-firebase-adminsdk-fbsvc-bb070d5860.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
}); // TODO LO DE ACÁ ARRIBA ES PARA CONECTAR FIREBASE CON EL JSON DESCARGABLE Y NO DESDE EL .ENV

module.exports = admin; // esto lo mando a index y al middleware de auth 