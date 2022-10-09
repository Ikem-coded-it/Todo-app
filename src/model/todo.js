const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 20,
        },
        description: {
            type: String
        }
    }, 
    { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;