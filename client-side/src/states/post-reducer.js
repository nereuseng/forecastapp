const initPostState = {
    posts: [],
    postLoading: false
}

export function post(state = initPostState, action) {
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
                postLoading: true,
            }
        case '@POST/END_CREATE_POST':
            return {
                ...state,
                postLoading: false
            }
        default:
            return state;
    }
}

const initPostFormState = {
    inputValue: '',
    mood: 'na',
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
        case '@POST_FORM/RESET_FORM':
            return {
                ...initPostFormState
            }
        default:
            return state;
    }
}

const getInitVoteState = {
    id: '',
    mood: 'na'
}

export function vote(state = getInitVoteState, action) {
    switch (action.type) {
        case '@VOTE/START_CREATE_VOTE':
            return {
                ...state,
                id: action.id,
                mood: action.mood
            }
        case '@VOTE/END_CREATE_VOTE':
            return {
                ...state,
            }
    
        default:
            return state;
    }
}