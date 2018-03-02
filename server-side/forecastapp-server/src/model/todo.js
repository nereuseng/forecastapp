const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function listTodo(searchText = '') {
    return new Promise((resolve, reject) => {
        if(!fs.existsSync('data-todos.json')){
            fs.writeFileSync('data-todos.json', '');
        }

        fs.readFile('data-todos.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let todos = data ? JSON.parse(data) : [];
            // searchText === '' 的话為false 
            if (todos.length > 0 && searchText) {
                todos = todos.filter( t => {
                    return t.text.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1
                })
            }
            resolve(todos)
        })
    })
}

function createTodo(mood, text) {
    return new Promise(async (resolve, reject) => {
        const newTodo = {
            id: uuid(),
            mood: mood,
            text: text,
            check: false,
            ts: moment().unix()
        }

        let todos = await listTodo();
        todos = [
            newTodo,
            ...todos
        ];
        fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
            if (err) reject (err);

            resolve(newTodo);
        })
    });
}

module.exports = {
    listTodo,
    createTodo
}