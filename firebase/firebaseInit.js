const admin = require("firebase-admin");
require("dotenv").config();
admin.initializeApp({
    credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // esto es clave
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_x509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_x509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    }),
});

/* const admin = require("firebase-admin");
const path = require('path');

const serviceAccountPath = path.join(__dirname, '../config/final-project-break-firebase-adminsdk-fbsvc-bb070d5860.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
}); // TODO LO DE ACÁ ARRIBA ES PARA CONECTAR FIREBASE CON EL JSON DESCARGABLE Y NO DESDE EL .ENV
*/
module.exports = admin; // esto lo mando a index y al middleware de auth  