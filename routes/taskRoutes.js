const express = require("express");

const router = express.Router();

const { createNewTask, updateTask, getTask, getAllTasks, deleteTask } = require("../controller/taskController");

router.post("/create-task", createNewTask);
router.put("/:taskId", updateTask);
router.get("/", getAllTasks);
router.get("/:taskId", getTask);
router.delete("/delete/:taskId", deleteTask);


module.exports = router;