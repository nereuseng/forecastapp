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

        // this.handleClearVote = this.handleClearVote.bind(this);
        // this.handleCloudsVote = this.handleCloudsVote.bind(this);
        // this.handleDrizzleVote = this.handleDrizzleVote.bind(this);
        // this.handleRainVote = this.handleRainVote.bind(this);
        // this.handleThunderVote = this.handleThunderVote.bind(this);
        // this.handleSnowVote = this.handleSnowVote.bind(this);
        // this.handleWindyVote = this.handleWindyVote.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    render(){
        const {id, mood, text, ts, check} = this.props

        return (
            <div className="todoItem" onClick={this.handleClick}>
                <div className="todoItem-todo">
                    <div className='mood'>
                        <i className={`${getMoodIcon(`${mood}`)} fa-sm`}></i>&nbsp;
                    </div>
                    <div className='wrap'>
                        <div className='ts'>{moment(ts * 1000).calendar()}</div>
                        <div className='text'>{text}</div>
                    </div>
                </div>
                <div className="todoItem-check">
                    {/* <div className="voteresult">
                            {clearVotes > 0 && <span><i className={getMoodIcon('Clear')}></i>&nbsp;{clearVotes}&nbsp;&nbsp;</span>}
                            {cloudsVotes > 0 &&<span><i className={getMoodIcon('Clouds')}></i>&nbsp;{cloudsVotes}&nbsp;&nbsp;</span>}
                            {drizzleVotes > 0 &&<span><i className={getMoodIcon('Drizzle')}></i>&nbsp;{drizzleVotes}&nbsp;&nbsp;</span>}
                            {rainVotes > 0 &&<span><i className={getMoodIcon('Rain')}></i>&nbsp;{rainVotes}&nbsp;&nbsp;</span>}
                            {thunderVotes > 0 &&<span><i className={getMoodIcon('Thunder')}></i>&nbsp;{thunderVotes}&nbsp;&nbsp;</span>}
                            {snowVotes > 0 &&<span><i className={getMoodIcon('Snow')}></i>&nbsp;{snowVotes}&nbsp;&nbsp;</span>}
                            {windyVotes > 0 &&<span><i className={getMoodIcon('Windy')}></i>&nbsp;{windyVotes}&nbsp;&nbsp;</span>}
                    </div> */}
                    {/* <div className="upvote"> */}
                        <i id={`todo-item-check-${id}`} className='fa fa-plus' onClick={this.handleCheck}></i>
                        {/* <div className={`voteBox ${(this.state.voteBoxOpen) ? "show" : ""}`} >
                            <i className={`${getMoodIcon('Clear')}`} ></i>&nbsp;
                            <i className={`${getMoodIcon('Clouds')}`} onClick={this.handleCloudsVote}></i>&nbsp;
                            <i className={`${getMoodIcon('Drizzle')}`} onClick={this.handleDrizzleVote}></i>&nbsp;
                            <i className={`${getMoodIcon('Rain')}`} onClick={this.handleRainVote}></i>&nbsp;
                            <i className={`${getMoodIcon('Thunder')}`} onClick={this.handleThunderVote}></i>&nbsp;
                            <i className={`${getMoodIcon('Snow')}`} onClick={this.handleSnowVote}></i>&nbsp;
                            <i className={`${getMoodIcon('Windy')}`} onClick={this.handleWindyVote}></i>
                        </div> */}
                    {/* </div> */}
                </div>
            </div>
        );
    }

    handleClick(){
        // console.log(`haha!`,this.props.id);
        this.props.onTodo(this.props.id);
        // 
        
        // this.setState((prevState, props) => ({
        //     voteBoxOpen: !prevState.voteBoxOpen
        // }));
        // let voteBoxList = document.getElementsByClassName('voteBox');
        // [...voteBoxList].forEach(value => {
        //     value.classList.toggle('show');
        // });
    }

    handleCheck(){
        // 直接遠端加上check state再list todo

        // this.props.onVote(this.props.id, 'CLear');
        // this.handleClick();
    }

    // handleCloudsVote(){
    //     this.props.onVote(this.props.id, 'Clouds');
    //     this.handleClick();
    // }

    // handleDrizzleVote(){
    //     this.props.onVote(this.props.id, 'Drizzle');
    //     this.handleClick();
    // }

    // handleRainVote(){
    //     this.props.onVote(this.props.id, 'Rain');
    //     this.handleClick();
    // }

    // handleThunderVote(){
    //     this.props.onVote(this.props.id, 'Thunder');
    //     this.handleClick();
    // }

    // handleSnowVote(){
    //     this.props.onVote(this.props.id, 'Snow');
    //     this.handleClick();
    // }

    // handleWindyVote(){
    //     this.props.onVote(this.props.id, 'Windy');
    //     this.handleClick();
    // }
}

