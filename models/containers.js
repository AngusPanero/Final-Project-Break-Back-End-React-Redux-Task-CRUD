const mongoose = require("mongoose")
const { type } = require("os")

const containerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        ref: "User",
        required: true
    },
    containerId:{
        type: String,
        required: true
    }
}, { timestamps: true })

const containerModel = mongoose.model("container", containerSchema)

module.exports = containerModel