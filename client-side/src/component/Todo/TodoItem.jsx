import React from 'react';
import moment from 'moment/min/moment.min';

import {getMoodIcon} from 'Utility/formIcon.js';

import './TodoItem.css'

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            voteBoxOpen: false
        };
        this.handleCheck = this.handleCheck.bind(this);
    }

    render(){
        const {id, mood, text, ts, check} = this.props;

        return (
            <div className="todoItem">
                <div className="todoItem-todo">
                    <div className='mood'>
                        <i className={`${getMoodIcon(`${mood}`)} fa-sm`}></i>&nbsp;
                    </div>
                    <div className='wrap'>
                        <div className='ts'>{moment(ts * 1000).calendar()}</div>
                        <div className={`text ${check ? 'checked' : ''}`}>{text}</div>
                    </div>
                </div>
                <div className="todoItem-check">
                        <div onClick={this.handleCheck}>
                            <i id={`todo-item-check-${id}`} className={`far fa-square ${check? 'hide': ''}`}></i>
                            <i id={`todo-item-check-${id}`} className={`far fa-check-square ${check? '': 'hide'}`}></i>
                        </div>
                </div>
            </div>
        );
    }

    handleCheck(){
        this.props.onTodo(this.props.id);
    }
}

