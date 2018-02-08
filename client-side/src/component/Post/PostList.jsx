import React, {Component} from 'react';
import 'src/component/Post/PostList.css';
// import {getMoodIcon} from 'Utility/formIcon.js';
import PostItem from './PostItem.jsx';

import {createVote} from 'states/post-actions.js';
import {connect} from 'react-redux';

class postList extends Component{
    constructor(props) {
        super(props);

        this.handleVote = this.handleVote.bind(this);
    }

    render(){
        const {posts} = this.props;
        // console.log(posts);
        

        let children = (
            <div className="children">
                No Post. Please Add Some post.
            </div>
        )

        if (posts.length) {
            children = posts.map(p =>(
                <div className="children">
                    <PostItem {...p} onVote={this.handleVote}/>
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