import axios from 'axios';
import moment from "moment";
import uuid from 'uuid/v4';

const todoKey = 'todos';

export function listTodo(searchText='') {
    const todoString = localStorage.getItem(todoKey);

    let todos = todoString ? JSON.parse(todoString) : [];
    // console.log(`listtodo `,todos);
    
    if(todos && searchText) {
        todos = todos.filter(t => {
            if(t.text.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1) return t; 
        })
    }
    return todos;
}

export function createTodo (mood, text) {
    const newTodo = {
        mood,
        text,
        id: uuid(),
        ts: moment().unix(),
        check: false
    }

    const todo = [
        newTodo,
        ...listTodo()
    ];
    // console.log(todo);
    

    localStorage.setItem(todoKey, JSON.stringify(todo));
    return todo;
}

export function checkTodo (id) {
    // console.log(id);
    
    const todos = listTodo().map(t => {
        if(t.id === id) t.check = !t.check;
        return t
    })
    // console.log(`todolist checkTodo api: `,todos);
    

    localStorage.setItem(todoKey, JSON.stringify(todos))
}