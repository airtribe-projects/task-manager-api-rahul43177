let tasksData = require("../model/taskManagerDatabase");

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
      return singleTask.id === Number(id);
    });

    if (!taskById) {
      return res.status(404).json({
        status: false,
        message: "The task ID not found in the database",
      });
    }

    return res.status(200).json(taskById);
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

    if (!title || !description |!title.trim() || !description.trim()) {
      //validations
      return res.status(400).json({
        status: false,
        message: "Title and Description are required fields",
      });
    }

    //ensuring the completed is boolean
    if (typeof completed != "boolean") {
      return res.status(400).json({
        status: false,
        message: "The completed can only be a boolean",
      });
    }

    const newTask = {
      id: tasksData.length + 1 , 
      title: title.trim(),
      description: description.trim(),
      completed,
    };

    tasksData.push(newTask);
    return res.status(201).json({
      status: true,
      newData: newTask,
      entireData: tasksData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const updateTaskFromId = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id)
      return res.status(400).json({
        status: false,
        message: "The ID is required to update the task",
      });

    id = Number(id);
    const { title, description, completed } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        status: false,
        message: "The title and description is required field.",
      });
    }
    if(typeof(completed) != "boolean") {
      return res.status(400).json({
        status : false , 
        message : "The completed field can only be boolean" 
      })
    }

    const task = tasksData.find((data) => {
      return data.id == id; 
    })

    if(!task) {
      return res.status(404).json({
        status : false ,  
        message : "Task not found" 
      })
    }

    //updating the task -> 
    task.title = title; 
    task.description = description; 
    task.completed = completed ; 

    return res.status(200).json({
      status : true , 
      message : "The task updated successfully" , 
      entireUpdatedTaskList : tasksData 
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteTaskFromId = async (req,res) => {
  try { 
    let {id} = req.params; 
    if(!id) {
      return res.status(400).json({
        status : false , 
        message : "Please enter the ID" 
      })
    } else {
      id = Number(id) //converting it into the number 
    }
    // //my way -- old 
    // //finding that id and deleting/filtering it out 
    // //finding the id 
    // const taskId = tasksData.find((data) => {
    //   return data.id === id; 
    // })
    // if(!taskId) {
    //   return res.status(404).json({
    //     status : false , 
    //     message : "The ID not found" 
    //   })
    // }
    // let updatedData = tasksData.filter((singleTask) => {
    //   return singleTask.id !== id ; 
    // }) 
    // tasksData = updatedData;

    //new way -- 
      //we find the index
      //mutate the array manually using slice 

    const index = tasksData.findIndex(task => task.id == id);
    if(index == -1) {
      return res.status(404).json({
        status : false , 
        message : "The id not found" 
      })
    }
    const removedTask = tasksData.splice(index , 1) ;
    


    return res.status(200).json({
      status : true , 
      message : `The task with ID - ${id} has been deleted successfully` , 
      totalTasks : tasksData.length ,
      deletedTaskData : tasksData , 
      removedTask
    })
    
  } catch(error) {
    return res.status(500).json({
      status : false , 
      error : error.message 
    })
  }
}

module.exports = {
  getAllTasks,
  getTaskFromId,
  createNewTask,
  updateTaskFromId , 
  deleteTaskFromId
};
