const initPostState = {
    searchText: '',
    posts: [],
    mood: 'na',
    text: 'na',
}

export function post(state = initPostState, action) {
    console.log(state);
    switch (action.type) {
        case '@POST/START_LIST_POST':
            return {
                ...state,
                searchText: action.searchText
            }
        
        case '@POST/END_LIST_POST':
            return {
                ...state,
                posts: action.posts
            }
        case '@POST/START_CREATE_POST':
            return {
                ...state,
                mood: action.mood,
                text: action.text
            }
        case '@POST/END_CREATE_POST':
            return {
                ...state,
            }
        default:
            return state;
    }
}

const initPostFormState = {
    inputValue: null,
    mood: null,
}

export function postForm(state = initPostFormState, action) {
    switch (action.type) {
        case '@POST_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            }
        case '@POST_FORM/SELECT_MOOD':
            return {
                ...state,
                mood: action.mood
            }    
            
        default:
            return state;
    }
}