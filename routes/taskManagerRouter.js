const {
  getAllTasks,
  getTaskFromId,
} = require("../controller/taskManagerController");

const router = require("express").Router();

//1. Get all the tasks
router.get("/", getAllTasks);
//2. Get the task with ID
router.get("/:id", getTaskFromId);

module.exports = {
  taskManagerRouter: router,
};
