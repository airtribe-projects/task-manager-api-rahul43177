const tasksData = require("../model/taskManagerDatabase");

const getAllTasks = async (req , res) => {
    try {
        //whatever the data is present in the tasksData -- entire data we need to send
        res.status(200).json(tasksData)
    } catch(error) {
        return res.status(500).json({
            status : false , 
            error : error 
        })
    }
}

const getTaskFromId = async (req , res )=> {
    try {
        const {id} = req.params; 
        if(!id) {
            return res.status(400).json({
                status : false , 
                messgae : "Please send the ID" 
            })
        }

        const taskById = tasksData.find((singleTask) => {
            return singleTask.id = id; 
        })

        if(!taskById) {
            return res.status(404).json({
                status : false , 
                message : "The task ID not found in the database" 
            })
        }

        return res.status(200).json({
            status : true , 
            data : taskById
        })
    } catch(error) {
        return res.status(500).json({
            status : false , 
            error 
        })
    }
}


module.exports = {
    getAllTasks , 
    getTaskFromId , 

}