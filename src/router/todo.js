const router = require('express').Router();
const controller = require('../controller/todoController')

router
.get('/new', controller.newTodo)
.post("/", controller.createTodo)
.get('/:id', controller.getTodo)
.put('/:id', controller.updateTodo)
.delete('/:id', controller.deleteTodo);

module.exports = router