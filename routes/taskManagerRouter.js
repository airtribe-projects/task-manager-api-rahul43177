const {
  getAllTasks,
  getTaskFromId,
  createNewTask
} = require("../controller/taskManagerController");

const router = require("express").Router();

//1. Get all the tasks
router.get("/", getAllTasks);
//2. Get the task with ID
router.get("/:id", getTaskFromId);

//3. Create a new task 
router.post("/" , createNewTask); 



module.exports = router; 
