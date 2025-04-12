const express = require("express");
const routerTask = express.Router();
const taskModel = require("../models/Tasks");
const taskController = require("./taskController")
const authTaskUser = require("../middlewares/taskByUserMiddleware")
require("dotenv").config()

routerTask.post("/create", authTaskUser, taskController.create)
routerTask.get("/read", authTaskUser, taskController.read)
routerTask.put("/update/:_id", authTaskUser, taskController.update)
routerTask.delete("/delete/:_id", authTaskUser, taskController.update)

module.exports = routerTask