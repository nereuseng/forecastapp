const fs = require('fs');

const todoModel = require('./todo.js');

function check(id) {
    return new Promise((resolve, reject) => {
        let checkedTodo = null;
        
        async () => {
            const todos = await todoModel.listTodo();
            todos = todos.map(t => {
                if(t.id === id) {
                    checkedTodo = t;
                    t.check = !t.check;
                }
                return t;
            });

            fs.writeFile('data-todos.json', JSON.stringify(posts), err => {
                if (err) reject(err);

                resolve(checkedTodo);
            })
        }
    })
}

module.exports = {
    check
};