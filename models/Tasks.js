const mongoose = require("mongoose");
const { type } = require("os");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,      
        maxlength: 30
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    limitDate: {
        type: Date,
    },
    comments: {
        type: [
            {
                text: {
                    type: String,
                    required: true,
                    minlength: 10,
                    maxlength: 500
                },
                reviewed:{
                    type: Boolean,
                    default: false
                }
            }
        ],
        default: []
    },
    email: {
        type: String,
        minlength: 10,
        maxlength: 60,
        trim: true,
        lowercase: true,
    },
    user: {
        type: String,
        ref: "User",
        required: true
    }
}, { timestamps: true })

const taskModel = mongoose.model("task", taskSchema)

module.exports = taskModel;