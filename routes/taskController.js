const taskModel = require("../models/Tasks")

const taskController = {
    create: async (req,res) => {
        try {
            console.log(req.body);

            const { title, completed, limitDate, comments, email } = req.body

            const task = await taskModel.create({
                title,
                completed,
                limitDate,
                comments,
                email,
                user: req.user.uid // acá pongo esto para que sea mas seguro el campo con la especifidad del UID
            })
            console.log("Usuario logueado (desde token):", req.user);
            
            return res.status(201).json({ message: "Tarea creada correctamente", task });

        } catch (error) {
            console.error("❌ ERROR EN CREACIÓN DE TASK:", error);
            res.status(500).json({error: "500 -  Error en la Solicitud"})
        }
    }
}

module.exports = taskController