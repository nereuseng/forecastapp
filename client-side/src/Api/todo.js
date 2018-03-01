import axios from 'axios';

// const todoKey = 'todos';

const todoBaseUrl = 'http://localhost:8080/api';

export function listTodo(searchText='') {
    let url = `${todoBaseUrl}/todos`

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then( res => {
        if (res.status !== 200){
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data
    })
}

export function createTodo (mood, text) {
    let url = `${todoBaseUrl}/todos`
    // console.log(todo);
    
    console.log(`Making POST request to: ${url}`);

    return axios.posts(url, {
        mood,
        text
    }).then( res => {
        if (res.status !== 200){
            throw new Error (`Unexpected response code: ${res.status}`);
        }
        return res.data;
    })

    localStorage.setItem(todoKey, JSON.stringify(todo));
    return todo;
}

export function checkTodo (id) {
    let url = `${todoBaseUrl}/todos/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then( res => {
        if (res.status !== 200) {
            throw new Error (`Unexpected response code: ${res.status}`);
        }
        return res.data;
    });
}