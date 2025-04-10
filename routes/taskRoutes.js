const express = require("express");
const routerTask = express.Router();
const taskModel = require("../models/Tasks");
const taskController = require("./taskController")
const authTaskUser = require("../middlewares/taskByUserMiddleware")
require("dotenv").config()

routerTask.post("/create", authTaskUser, taskController.create)

module.exports = routerTask