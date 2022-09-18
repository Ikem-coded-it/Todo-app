const Todo = require('../model/todo'); 

// render new todo page
exports.newTodo = async (req, res) => {
    res.render("todo/new", { todo: new Todo() })
};


// Add todo task
exports.createTodo = async (req, res) => {
    const todo = await new Todo({
        title: req.body.title,
        description: req.body.description,
    })

    try {
        const newTodo = await todo.save()
        res.redirect(`/`)

    } catch (error) {
        if (error) {
            res.redirect("/", {
                errorMessage: "Failed to add todo."
            })
        }
    }
}


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

        res.redirect("/")
    } catch (error) {
        res.redirect("/", {
            errorMessage: "Failed to delete todo"
        })
    }
};


// Retrieve all todo tasks
exports.getAllTodos = async (req, res) => {
    let searchOptions = {}
    if(req.query.title != null && req.query.title != '') {
        searchOptions.title = new RegExp(req.query.title, 'i')
    }
    
    try {
        let todos = await Todo.find(searchOptions);
        res.render("index", {
            todos: todos,
            searchOptions: req.query
        }) 
    } catch (error) {
        res.redirect("/", {
            errorMessage: "Todo not found"
        })
    }
};


// Retrieve single todo
exports.getTodo = async (req, res) => {
    try {
        let id = {_id: req.params.id};
        let todo = await Todo.findOne(id);
         
        res.render("todo/show", {
            todo: todo
        })
    } catch (error) {
        res.redirect("/", {
            errorMessage: "Todo not found"
        })
    }
};