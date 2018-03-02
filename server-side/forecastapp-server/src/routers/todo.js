const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const todoModel = require('../model/todo.js');
const checkModel = require('../model/check.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController);

// ListTodo
router.get('/todos', function (req, res, next) {
    const {searchText, start} = req.query;
    todoModel.listTodo(searchText).then( posts => {
        res.json(posts);
    }).catch(next);
});

// CreateTodo
router.post('/todos', function (req, res, next) {
    const {mood, text} = req.body;
    console.log(`lalala`)
    if (!mood || !text) {
        const err = new Error('Mood and Text are required');
        err.status = 400;
        throw err;
    };
    todoModel.createTodo(mood, text).then( todo => {
        res.json(todo);
    }).catch(next);
});

// CheckTodo
router.post('/todos/:id', function (req, res, next) {
    const {id} = req.params;
    if (!id) {
        const err = new Error('Todo ID required.');
        err.status = 400;
        throw err;
    };

    checkModel.check(id).then( t => {
        res.json(t);
        
        
    }).catch(next);
});

module.exports = router;