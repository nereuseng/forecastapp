import uuid from 'uuid/v4';
import moment from 'moment';

const postKey = 'posts';

export function createPost(mood, text){
    return new Promise((resolve, reject) => {
        resolve(_createPost(mood, text));
    })
}

function _createPost(mood, text) {
    const newPost = {
        id: uuid(),
        mood: mood,
        text: text,
        ts: moment().unix(),
        clearVotes: 0,
        cloudsVotes: 0,
        drizzleVotes: 0,
        rainVotes: 0,
        thunderVotes: 0,
        snowVotes: 0,
        windyVotes: 0
    };
    const posts = [
        newPost,
        ..._listPost()
    ];
    console.log(posts);
    
    localStorage.setItem(postKey, JSON.stringify(posts) );
    return newPost;
}

export function listPost(searchText = ''){
    return new Promise((resolve, reject) => {
        // 這邊可能是延遲的
        resolve(_listPost(searchText));
    })
}

function _listPost(searchText = '') {
    let postString = localStorage.getItem(postKey);
    let posts = postString ? JSON.parse(postString) : [];
    if (posts.length > 0 && searchText) {
        posts = posts.filter(p => {
            return p.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        })
    }
    return posts;

    // searchText.toUpperCase();
    // for(let i = 0; i < posts.length; i++){
    //     if (posts[i].text.toUpperCase().indexOf(searchText) > -1){
    //         return posts[i].text
    //     }
    // }

}

export function createVote(id, mood){
   return new Promise((resolve, reject) => {
       resolve(_createVote(id, mood));
   })
}

function _createVote(id, mood) {
    const posts = _listPost().map(p => {
        if (p.id === id) {
            p[mood.toLowerCase()+'Votes']++;
        }
        return p;   
    })
    localStorage.setItem(postKey, JSON.stringify(posts));
}