const containerModel = require("../models/containers")
const taskModel = require("../models/Tasks")
const mongoose = require("mongoose")

const containerController = {
    createContainer: async (req, res) => {
        const { name } = req.body
        const userId = req.user.uid
        console.log("userId", userId);
        

        try {
            const newContainer = new containerModel({ name, user: userId, containerId: Date.now().toString() })
            await newContainer.save()
            res.status(201).json({ success: true, container: newContainer });

        } catch (error) {
            console.log("Error al Crear Contenedor" ,error);
            res.status(500).json({ success: false, message: "Error al crear el contenedor", error });
        }
    },
    getContainers: async (req, res) => {
        const userId = req.user.uid

        try {
            const containers = await containerModel.find({ user: userId })
            res.json(containers)

        } catch (error) {
            console.log("Error al Leer Containers", error);
            
            res.status(500).json({ success: false, message: "Error al obtener los contenedores", error });
        }
    },
    
    deleteContainers: async (req, res) => {
        const containerId = req.params.id; 
        const userId = req.user.uid;
    
        try {
            const container = await containerModel.findById(containerId);
            console.log("Container Delete", containerId);
            
            if (!container) {
                return res.status(404).json({ success: false, message: "Contenedor no encontrado" });
            }
    
            if (container.user.toString() !== userId) {
                return res.status(403).json({ success: false, message: "No tienes permisos para eliminar este contenedor" });
            }
    
            await taskModel.deleteMany({ containerId: containerId });
    
            await containerModel.findByIdAndDelete(containerId);
    
            res.status(200).json({ success: true, message: "Contenedor y tareas eliminadas con éxito" });
    
        } catch (error) {
            console.log("Error al Borrar Contenedor", error);
            res.status(500).json({ success: false, message: "Error al eliminar el contenedor", error });
        }
    }
}

module.exports = containerController