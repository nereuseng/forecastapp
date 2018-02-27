import {handleActions} from 'redux-actions'

const initTodoFormState = {
    inputValue: '',
    mood: 'na'
}

export const todoForm = handleActions({
    ['SELECT_MOOD']:
        function(state, {payload}) {
            return {
                ...state,
                mood: payload
            }
        },
    ['INPUT']:
        function (state, {payload}) {
            return {
                ...state,
                inputValue: payload
            }
        },
    ['RESET_FORM']:
        function (state, paylaod) {
            return {
                ...initTodoFormState
            }
        }
}, initTodoFormState)

const initTodoState = {
    todos: [],
    todoLoading: false
}

export const todo = handleActions({
    ['SET_LIST_TODO']: 
        function(state, {payload}) {            
            console.log(payload);
            
            return {
                ...state,
                todos: payload
            }
        },
    ['SET_CREATE_TODO']: 
        function (state, {payload}) {
            return state
        },
    ['SET_CHECK_TODO']: 
        function (state, {paylaod}) {
            return state
        },
    ['FETCH_TODO_REQUEST']:
        function (state, payload) {
            return {
                ...state,
                todoLoading: true
            }
        },
    ['FETCH_TODO_RESPONSE']: 
        function (state, {payload}) {
            return {
                ...state,
                todoLoading: false
            }
        }
}, initTodoState);