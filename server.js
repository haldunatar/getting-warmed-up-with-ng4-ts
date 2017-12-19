const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(3000, () => console.log('server is running on 3000'));

mongoose.connect('mongodb://localhost:27017/todo-list');

const Schema = mongoose.Schema; 

const todoShema = new Schema({ 
    title: { type: String },
    status: { type: Boolean }
}); 

const Todo = mongoose.model('Todo', todoShema);

app.get('/rest/todo-list', getTodos);
app.post('/rest/todo-list', createTodo);
app.put('/rest/todo-list/:id', updateTodo);
app.delete('/rest/todo-list/:id', removeTodo);
app.delete('/rest/todo-list-all', removeTodoAll);

function getTodos(req, res) { 
    Todo.find({}, createResponse.bind(null, res));
}

function createTodo(req, res) {
    Todo.create(req.body, createResponse.bind(null, res));
}

function updateTodo(req, res) {
    Todo.findByIdAndUpdate(req.params.id, req.body, createResponse.bind(null, res));
}

function removeTodo(req, res) {
    Todo.remove({_id: req.params.id}, createResponse.bind(null, res));
}

function removeTodoAll(req, res) { 
    Todo.remove({}, createResponse.bind(null, res));
}

function createResponse(res, err, todos) {
	if (err) return res.send(err); 
	
    return res.json(todos);
}