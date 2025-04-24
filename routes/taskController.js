const taskModel = require("../models/Tasks")
const containerModel = require("../models/containers")
const mongoose = require("mongoose")

const taskController = {
    create: async (req,res) => {
        try {
            console.log("REQ BODY", req.body);

            const { title, description, completed, limitDate, comments, email, containerId} = req.body

            const task = await taskModel.create({
                title,
                description: description || null,
                completed,
                limitDate: limitDate || null,
                comments: comments || [],
                email: email || null,
                user: req.user.uid,
                containerId
            });

            console.log("NEW TASK", task);
            
            
            if(!task){
                console.error("ERROR", error);
            res.status(404).send({ message: "404 - ID no Encontrado" })
            }
            
            res.status(201).json(task);

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
            
            res.status(200).json(readTasks)
        } catch (error) {
            console.log("ERROR READ", error);
            res.status(500).json({ message: "Error Interno" })
        }
    },
    update: async (req,res) => {
        try {
            const updateTask = await taskModel.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                description: req.body.description, 
                limitDate: req.body.limitDate,
                comments: req.body.comments,
                completed: req.body.completed, 
                email: req.body.email, 
                user: req.body.user,
                containerId: req.body.containerId 
            }, { new: true })

            console.log("updateTask", updateTask);

            if(!updateTask){
                console.error("UPDATE - ERROR");
            res.status(404).send({ message: "404 - ID no Encontrado" })
            }
            res.status(200).json(updateTask)
        } catch (error) {
            console.log("Update Error", error);
            res.status(500).json({ message: "Error Interno" })
        }
    }, 
    updateTaskCompleted: async (req, res) => {
        const taskId = req.params.id; 
        const { completed } = req.body; 
    
        console.log("TASK ID BACK UPDATE", taskId);
        console.log("COMPLETED UPDATE BACK", completed);
        
        try {
            const task = await taskModel.findByIdAndUpdate(taskId, { completed: completed }, { new: true });
            console.log("TASK UPDATE", task);
            
    
            if (!task) {
                return res.status(404).json({ message: "No Existe La Tarea" });
            }
            return res.status(200).json(task); 
    
        } catch (error) {
            console.log("Error en la actualización de tarea:", error);
            return res.status(500).json({ message: "Error al actualizar la tarea" });
        }
    },

    updateComment: async (req, res) => {
        const { taskId, commentId } = req.params;
        const { reviewed } = req.body;
    
        console.log("TASK ID:", taskId, "COMMENT ID:", commentId, "REVIEWED:", reviewed);
    
        try {
            const updatedTask = await taskModel.findOneAndUpdate(
                { _id: taskId, "comments._id": commentId }, // aca le digo que primero buscque en el doc general el task_id, dsps mongo tipo query usa strin para decir que busque un comments en el array que el _id sea igual a commentId, no pq le este pasando como Key un strin
                { $set: { "comments.$.reviewed": reviewed } }, // aca le doy el seteo a modificar el Subdocumento, $set es un operador de MongoDB
                { new: true }
            );
    
            if (!updatedTask) {
                return res.status(404).json({ message: "Tarea o comentario no encontrados" });
            }
    
            return res.status(200).json(updatedTask);
        } catch (error) {
            console.log("Error en la actualización de comentario:", error);
            return res.status(500).json({ message: "Error al actualizar el comentario" });
        }
    },

    deleteComment: async (req, res) => {
        const { taskId, commentId } = req.params
        console.log("TASK ID", taskId, "commentId", commentId);
        try {
            const deleteComment = await taskModel.findByIdAndUpdate(
                taskId,
                { $pull: { comments: { _id: commentId } } }, 
                // $pull es un operador de MongoDb para eliminar datos de un array en mi caso seria el subdocumento que tengo en mi modelo de task que llevar un objeto de comment como se llama en el modelo y el _id de mongo que es el parametro que le doy commentId
                { new: true }
            );
            if (!deleteComment) {
                return res.status(404).json({ message: "Comentario no encontrado, No es Posible Eliminar" });
            }
            return res.status(200).json({ message: "Eliminado Exitosamente" });
        } catch (error) {
            console.log("Error en la actualización de comentario:", error);
            return res.status(500).json({ message: "Error al Eliminar el comentario" });
        }
    },

    delete: async (req, res) => {
        try {
            const deleteTask = await taskModel.findByIdAndDelete(req.params.id)
            console.log("deleteTask", deleteTask);
            res.status(200).json({ message: "Delete Exitoso" })

            if(!deleteTask){
                console.error("ERROR");
            res.status(404).send({ message: "404 - ID no Encontrado" })
            }

        } catch (error) {
                console.log("Update Error", error);
                res.status(500).json({ message: "Error Interno" })
        }
    }
}

module.exports = taskController