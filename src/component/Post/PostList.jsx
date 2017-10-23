import React, {Component} from 'react';

export default class postList extends Component{
    constructor(props) {
        super(props);
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
                <div>
                    {p.mood}&nbsp;
                    {p.text}
                </div>
            ))
        }

        return(
            children 
        )
    }
}