const {Schema, model} = require('mongoose');

const todoSchema = new Schema(
    {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 20,
        },
        description: {
            type: String,
            required: true,
        }
    }, 
    { timestamps: true }
);

const todoModel = model('todos', todoSchema);

module.exports = todoModel;