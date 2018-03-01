import { createAction, createActions } from 'redux-actions';

import {
    listTodo as listTodoFromApi,
    createTodo as createTodoFromApi,
    checkTodo as checkTodoFromApi
} from 'Api/todo.js'

export const {
    input,
    selectMood,
    resetForm
} = createActions(
    'INPUT',
    'SELECT_MOOD',
    'RESET_FORM'
)

const {
    // setlistTodo,
    setCreateTodo,
    setCheckTodo,
    fetchTodoRequest,
    fetchTodoResponse
} = createActions(
    // 'SET_LIST_TODO',
    'SET_CREATE_TODO',
    'SET_CHECK_TODO',
    'FETCH_TODO_REQUEST',
    'FETCH_TODO_RESPONSE'
)

const setlistTodo = createAction('SET_LIST_TODO');

export function listTodo() {
    return async (dispatch, getState) => {
        dispatch(fetchTodoRequest());
        try {
            const todos = await listTodoFromApi();
            // console.log(todos);
            
            dispatch(setlistTodo(todos));
            dispatch(fetchTodoResponse());
            return todos;
        } catch (error) {
            console.error('Error getting todo', error);
        };
    }
}

export function createTodo(mood, text) {
    return async (dispatch, getState) => {
        dispatch(fetchTodoRequest());
        try {
            await createTodoFromApi(mood, text);
            dispatch(setCreateTodo());
            await dispatch(listTodo());
            dispatch(fetchTodoResponse());
        } catch (error) {
            console.error('Error creating todo', error);
        }
    }
}

export function checkTodo(id) {
    return async (dispatch, getState) => {
        dispatch(fetchTodoRequest());
        try {
            await checkTodoFromApi(id);
            dispatch(setCheckTodo());
            await dispatch(listTodo());
            dispatch(fetchTodoResponse());
        } catch (error) {
            
        }
    }
}