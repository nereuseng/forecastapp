import axios from 'axios';

// const todoBaseUrl = 'http://localhost:8080/api';

const todoBaseUrl = 'http://forecastapp.us-west-2.elasticbeanstalk.com/api';

export function listTodo(searchText='') {
    let url = `${todoBaseUrl}/todos`
    if (searchText) url += `?searchText=${searchText}`
    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then( res => {
        if (res.status !== 200){
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        console.log(`resdata`, res.data);
        
        return res.data
    })
}

export function createTodo (mood, text) {
    let url = `${todoBaseUrl}/todos`
    // console.log(todo);
    
    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        mood,
        text
    }).then( res => {
        if (res.status !== 200){
            throw new Error (`Unexpected response code: ${res.status}`);
        }
        return res.data;
    })
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