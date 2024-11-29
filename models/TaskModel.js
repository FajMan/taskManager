const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
        unique: true,
    }
}, 
{
    timestamps: true,
}
);

const Task = mongoose.model("Task", TaskSchema)

module.exports = Task;