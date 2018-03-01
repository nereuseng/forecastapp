import React, {Component} from 'react';
// import 'src/component/Post/PostList.css';
// import {getMoodIcon} from 'Utility/formIcon.js';
import TodoItem from 'Todo/TodoItem.jsx';

import {checkTodo} from 'states/todo-action.js';
import {connect} from 'react-redux';

class todoList extends Component{
    constructor(props) {
        super(props);

        this.handleTodo = this.handleTodo.bind(this);
    }

    render(){
        // const todo = [];
        const {todos} = this.props;
        // console.log(todos);
        

        let children = (            
            <div className="children">
                No Post. Please Add Some post.
            </div>
        )

        if (todos.length) {
           
            children = todos.map(t =>(
                <div className="children">
                    <TodoItem {...t} onTodo={this.handleTodo}/>
                </div>
            ))
        }

        return(
            children 
        )
    }

    handleTodo(id){
        // console.log(`todolist handletodo id: `,id);
        
        this.props.dispatch(checkTodo(id));
        // this.props.onVote(id, mood);
        // .then listPost()
    }
}

export default connect( (state) => {
    return {
        ...state.todo
    };
})(todoList)