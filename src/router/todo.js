const router = require('express').Router();
const controller = require('../controller/todoController')

router
.get('/new', controller.newTodo)
.get("/:id/edit", controller.editTodo)
.put('/:id', controller.updateTodo)
.post("/", controller.createTodo)
.get('/:id', controller.getTodo)
.delete('/:id', controller.deleteTodo);

module.exports = router