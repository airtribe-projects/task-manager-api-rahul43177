const tasksData = require("../model/taskManagerDatabase");

const getAllTasks = async (req, res) => {
  try {
    //whatever the data is present in the tasksData -- entire data we need to send
    res.status(200).json(tasksData);
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error,
    });
  }
};

const getTaskFromId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        messgae: "Please send the ID",
      });
    }

    const taskById = tasksData.find((singleTask) => {
      return (singleTask.id === Number(id));
    });

    if (!taskById) {
      return res.status(404).json({
        status: false,
        message: "The task ID not found in the database",
      });
    }

    return res.status(200).json({
      status: true,
      data: taskById,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error,
    });
  }
};

const createNewTask = async (req, res) => {
  try {
    const { title, description, completed = false } = req.body; //by default completed is false 
    
    if(!title.trim() ||!description.trim()) { //validations 
        return res.status(400).json({
            status : false , 
            message : "Title and Description are required fields"
        }) 
    }
    
    //ensuring the completed is boolean 
    if(typeof completed != boolean) {
        return res.status(400).json({
            status : false , 
            message : "The completed can only be a boolean" 
        })
    }

    const newTask = {
        id : Date.now().round(2) , 
        title : title.trim() , 
        description : description.trim() , 
        completed
    }

    tasksData.push(newTask);
    return res.status(201).json({
        status : true , 
        newData : newTask , 
        entireData : tasksData  
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      error : error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskFromId,
  createNewTask
};
