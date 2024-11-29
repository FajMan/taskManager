const asyncHandler = require("express-async-handler");
const Task = require("../models/TaskModel");


const createNewTask = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
  
    try {
      if (!title || !description ) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const taskExist = await Task.findOne({ title });
  
      if (taskExist) {
        return res.status(400).json({ message: "Task already exist" });
      }
  
      const task = await Task.create({
        title,
        description,
      });
      res.status(201).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  const updateTask = asyncHandler(async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const { title, description } = req.body;
  
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task no found" });
      }
      task.title = title || task.title;
      task.description = description || task.description;
  
      const updatedTask = await task.save();
      res.status(200).json(updatedTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

  const getTask = asyncHandler(async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const task = await Task.findById(taskId);
      if (task) {
        return res.status(200).json(task);
      } else {
        return res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  const getAllTasks = asyncHandler(async (req, res) => {
    try {
      const tasks = await Task.find().sort("-createdAt");
      if (!tasks) {
        return res.status(404).json({ message: "No task found" });
      }
      res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  const deleteTask = asyncHandler(async (req, res) => {
    try {
      const { taskId } = req.params;
  
      const task = await Task.findById(taskId);
  
      if (!task) {
        res.status(404);
        throw new Error("Task not found");
      }
  
      await task.deleteOne();
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ errorMessage: error.message });
    }
  });

module.exports = { createNewTask, updateTask, getTask, getAllTasks, deleteTask };
