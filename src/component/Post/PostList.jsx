import React, {Component} from 'react';
import 'src/component/Post/PostList.css';
import {getMoodIcon} from './postIcon.js';
import moment from 'moment';
import PostItem from './PostItem.jsx';

export default class postList extends Component{
    constructor(props) {
        super(props);

        this.handleVote = this.handleVote.bind(this);
    }

    render(){
        const {posts} = this.props;

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
        this.props.onVote(id, mood);
    }
}