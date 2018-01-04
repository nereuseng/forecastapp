import {
    createPost as createPostFromApi,
    createVote as createVoteFromApi,
    listPost as listPostFromApi,
} from 'Api/post.js'

/*
*   TODO: Post loading state
*/
/* List Post */

function startListPost(searchText) {
    return {
        type: '@POST/START_LIST_POST',
        searchText
    };
}

function endListPost(posts) {
    return {
        type: '@POST/END_LIST_POST',
        posts
    }
}

export function listPost(searchText) {
    return (dispatch, getState) => {
        dispatch(startListPost(searchText));
        return listPostFromApi(searchText).then(posts => {
            dispatch(endListPost(posts))
        }).catch(err => {
            console.error('Error getting post', err);
        });
    }
}

/* Post */

function startCreatePost(mood, text) {
    return {
        type: '@POST/START_CREATE_POST',
        mood,
        text
    }
}

function endCreatePost() {
    return {
        type: '@POST/END_CREATE_POST',
    }
}

export function createPost(mood, text) {
    return (dispatch, getState) => {
        dispatch(startCreatePost(mood, text));
        return createPostFromApi(mood, text).then( () => {
            dispatch(endCreatePost());
            listPost();
        }).catch(err => {
            console.error('Error creating post', err);
        });
    }
}

/* Post Form*/

export function selectMood(mood) {
    return {
        type: '@POST_FORM/SELECT_MOOD',
        mood: mood
    }
}

export function input(value) {
    return {
        type: '@POST_FORM/INPUT',
        value: value
    };
}



