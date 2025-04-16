const taskModel = require("../models/Tasks")
const containerModel = require("../models/containers")
const mongoose = require("mongoose")

const taskController = {
    create: async (req,res) => {
        try {
            console.log("REQ BODY", req.body);

            const { title, description, completed, limitDate, comments, email, containerId } = req.body

            const task = await taskModel.create({
                title,
                description: description || null,
                completed,
                limitDate: limitDate || null,
                comments: comments || [],
                email: email || null,
                user: req.user.uid,
                containerId: containerId
            });

            console.log("NEW TASK", task);
            
            
            if(!task){
                console.error("ERROR", error);
            res.status(404).send({ message: "404 - ID no Encontrado" })
            }
            
            res.status(201).json({ message: "Tarea creada correctamente", task });

        } catch (error) {
            res.status(500).json({ message: "Error Interno" })
        }
    },
    read: async (req, res) => {
        try {
            const readTasks = await taskModel.find({ user: req.user.uid }); // aca el uid para buscar por user las task
            console.log("REQ USER UID", req.user.uid);

            if(!readTasks){
                console.error("ERROR", error);
            res.status(404).send({ message: "404 - ID no Encontrado" })
            }
            
            res.status(200).json({ message: readTasks })
        } catch (error) {
            console.log("ERROR READ", error);
            res.status(500).json({ message: "Error Interno" })
        }
    },
    update: async (req,res) => {
        try {
            const updateTask = await taskModel.findByIdAndUpdate(req.params._id, {
                title: req.body.title,
                description: req.body.description, 
                limitDate: req.body.limitDate,
                comments: req.body.comments, 
                email: req.body.email, 
                user: req.body.user 
            }, { new: true })

            console.log("updateTask", updateTask);
            res.status(200).json({ message: updateTask })

            if(!updateTask){
                console.error("ERROR", error);
            res.status(404).send({ message: "404 - ID no Encontrado" })
            }

        } catch (error) {
            console.log("Update Error", error);
            res.status(500).json({ message: "Error Interno" })
        }
    }, 
    delete: async (req, res) => {
        try {
            const deleteTask = await taskModel.findByIdAndDelete(req.params.id)
            console.log("deleteTask", updateTask);
            res.status(200).json({ message: deleteTask })

            if(!deleteTask){
                console.error("ERROR", error);
            res.status(404).send({ message: "404 - ID no Encontrado" })
            }

        } catch (error) {
                console.log("Update Error", error);
                res.status(500).json({ message: "Error Interno" })
        }
    }
}

module.exports = taskController