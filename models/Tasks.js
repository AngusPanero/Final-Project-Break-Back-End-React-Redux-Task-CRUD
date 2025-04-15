const mongoose = require("mongoose");
const { type } = require("os");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,      
        maxlength: 50
    },
    description: {
        type: String,
        default: null, 
        required: false
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    },
    limitDate: {
        type: Date,
        default: null,
        required: false,
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
        default: [],
        required: false,
    },
    email: {
        type: String,
        minlength: 10,
        maxlength: 60,
        trim: true,
        lowercase: true,
        default: null,
        required: false,
    },
    user: {
        type: String,
        ref: "User",
        required: true
    }
}, { timestamps: true })

const taskModel = mongoose.model("task", taskSchema)

module.exports = taskModel;