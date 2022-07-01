const Todo = require('../model/todo'); 

// Add todo task
exports.addTodo = async (req, res) => {
    try {
        let todo = await req.body;
        let added = await Todo.create(todo);
        if (!added) return res.status(400).json({
            success: false,
            message: 'Failed to add todo',
        });
        return res.status(201).json({
            success: true,
            message: 'Todo added',
            todo: added
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    };
};


// Update todo task
exports.updateTodo = async (req, res) => {
    try {
        let id = {_id: req.params.id}
        let todo = await req.body;
        let update = await Todo.findOneAndUpdate(id, todo, {new: true});

        if (!update) return res.status(400).json({
            success: false,
            message: "Todo not updated",
        });
        return res.status(200).json({
            success: true,
            message: "Todo updated",
            todo: update,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    };
};


// Delete todo task
exports.deleteTodo = async (req, res) => {
    try {
        let id = {_id: req.params.id};
        let deleted = await Todo.findOneAndDelete(id);

        if (!deleted) return res.status(400).json({
            success: false,
            message: "Todo not deleted",
        });
        return res.status(200).json({
            success: true,
            message: "Todo deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    };
};


// Retrieve all todo tasks
exports.getAllTodos = async (req, res) => {
    try {
        let todos = await Todo.find();
        if (todos.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No todos were found'
            });
        };
        res.status(200).json({
            success: true,
            message: "Retrieved all todos",
            todos,
            count: todos.length,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


// Retrieve single todo
exports.getTodo = async (req, res) => {
    try {
        let id = {_id: req.params.id};
        let todo = await Todo.findOne(id);
        if(!todo) return res.status(404).json({
            success: false,
            message: "Todo not found",
        });
        res.status(200).json({
            message: "Todo found",
            todo,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};