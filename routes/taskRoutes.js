const express = require("express");
const routerTask = express.Router();
const taskModel = require("../models/Tasks");
const taskController = require("./taskController")
const containerController = require("./containerController")
const authTaskUser = require("../middlewares/taskByUserMiddleware")
require("dotenv").config()

//Rutas CRUD
routerTask.post("/create", authTaskUser, taskController.create)
routerTask.get("/read", authTaskUser, taskController.read)
routerTask.put("/update/:id", authTaskUser, taskController.update)
routerTask.delete("/delete/:id", authTaskUser, taskController.delete)
routerTask.put("/updateCompletedTask/:id", authTaskUser, taskController.updateTaskCompleted)

//Rutas Containers
routerTask.post("/createContainer", authTaskUser, containerController.createContainer)
routerTask.get("/readContainers", authTaskUser, containerController.getContainers)
routerTask.delete("/deleteContainer/:id", authTaskUser, containerController.deleteContainers)

module.exports = routerTask