const Todo = require('../model/todo'); 

// render new todo page
exports.newTodo = async (req, res) => {
    res.render("todo/new", { todo: new Todo() })
};


// Add todo task
exports.createTodo = async (req, res) => {
    try {
        const todo = await new Todo({
            title: req.body.title,
            description: req.body.description,
        })
         
        await todo.save()
        res.redirect(`/`)

    } catch (error) {
        errorHandler(req, res)
    }
}

// render todo edit page
exports.editTodo = async(req, res) => {
    const todo = await Todo.findById(req.params.id)
    try {
        res.render("todo/edit", { todo: todo })
    } catch (error) {
        errorHandler(req, res)
    }
}

// Edit todo task
exports.updateTodo = async (req, res) => {
    try {
        let id = {_id: req.params.id}
        let todo = req.body;
        await Todo.findOneAndUpdate(id, todo, {new: true});

        res.redirect("/")
    } catch (error) {
        res.redirect(`/todo/${id}`)
    };
};

// Delete todo task
exports.deleteTodo = async (req, res) => {
    try {
        let id = {_id: req.params.id};
        await Todo.findOneAndDelete(id);

        res.redirect("/")
    } catch (error) {
        errorHandler(req, res)
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
        errorHandler(req, res)
    }
};

// Retrieve single todo
exports.getTodo = async (req, res) => {
    try {
        let id = {_id: req.params.id};
        let todo = await Todo.findOne(id);
         
        const date = todo.createdAt.toLocaleDateString()
        const time = todo.createdAt.toLocaleTimeString()

        res.render("todo/show", {
            todo: todo,
            date: date,
            time: time
        })
    } catch (error) {
        errorHandler(req, res)
    }
};

async function errorHandler (req, res) {
    let searchOptions = {}
    if(req.query.title != null && req.query.title != '') {
        searchOptions.title = new RegExp(req.query.title, 'i')
    }

    const todos = await Todo.find({})
    res.render("index", { 
        todos: todos,
        searchOptions: req.query,
        errorMessage: "Something went wrong" 
    })
}