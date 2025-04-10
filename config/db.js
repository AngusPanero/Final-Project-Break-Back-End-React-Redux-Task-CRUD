const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        throw new Error("Error al Conectar DB")
    }
}

module.exports = { dbConnection }