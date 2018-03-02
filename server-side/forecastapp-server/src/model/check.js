const fs = require('fs');

const todoModel = require('./todo.js');

function check(id) {
    return new Promise(async (resolve, reject) => {
        let checkedTodo = null;
        let todos = await todoModel.listTodo();
        todos = todos.map(t => {
            if(t.id === id) {
                checkedTodo = t;
                t.check = !t.check;
            }
            return t;
        });

        fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
            if (err) reject(err);

            resolve(checkedTodo);
        })
})
}

module.exports = {
    check
};