import React, {Component} from 'react';
// import 'src/component/Post/PostList.css';
// import {getMoodIcon} from 'Utility/formIcon.js';
import TodoItem from 'Todo/TodoItem.jsx';

import {checkTodo} from 'states/todo-action.js';
import {connect} from 'react-redux';

class postList extends Component{
    constructor(props) {
        super(props);

        this.handleVote = this.handleVote.bind(this);
    }

    render(){
        // const todo = [];
        const {todos} = this.props;
        console.log(todos);
        

        let children = (            
            <div className="children">
                No Post. Please Add Some post.
            </div>
        )

        if (todos.length) {
           
            children = todos.map(t =>(
                <div className="children">
                    <TodoItem {...t} onVote={this.handleVote}/>
                </div>
            ))
        }

        return(
            children 
        )
    }

    handleVote(id, mood){
        this.props.dispatch(createVote(id, mood));
        // this.props.onVote(id, mood);
        // .then listPost()
    }
}

export default connect( (state) => {
    return {
        ...state.vote
    };
})(postList)