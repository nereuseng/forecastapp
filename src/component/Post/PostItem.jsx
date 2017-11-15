import React from 'react';
import moment from 'moment';

import {getMoodIcon} from './postIcon.js';

import './PostItem.css'

export default class PostItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleClearVote = this.handleClearVote.bind(this);
        this.handleCloudsVote = this.handleCloudsVote.bind(this);
        this.handleDrizzleVote = this.handleDrizzleVote.bind(this);
        this.handleRainVote = this.handleRainVote.bind(this);
        this.handleThunderVote = this.handleThunderVote.bind(this);
        this.handleSnowVote = this.handleSnowVote.bind(this);
        this.handleWindyVote = this.handleWindyVote.bind(this);
    }

    render(){
        const {id, mood, text, ts, clearVotes, cloudsVotes, drizzleVotes, rainVotes, thunderVotes, snowVotes, windyVotes} = this.props


        return (
            <div className="post">
                <div className='mood'>
                    <i className={getMoodIcon(`${mood}`)}></i>&nbsp;
                </div>
                <div className='wrap'>
                    <div className='ts'>{moment(ts * 1000).calendar()}</div>
                    <div className='text'>{text}</div>
                </div>
                <div className="vote">
                    <div className="voteresult">
                            {clearVotes > 0 && <span><i className={getMoodIcon( 'Clear')}></i>&nbsp;{clearVotes}&nbsp;&nbsp;</span>}
                            {cloudsVotes > 0 &&<span><i className={getMoodIcon( 'Clouds')}></i>&nbsp;{cloudsVotes}&nbsp;&nbsp;</span>}
                            {drizzleVotes > 0 &&<span><i className={getMoodIcon( 'Drizzle')}></i>&nbsp;{drizzleVotes}&nbsp;&nbsp;</span>}
                            {rainVotes > 0 &&<span><i className={getMoodIcon( 'Rain')}></i>&nbsp;{rainVotes}&nbsp;&nbsp;</span>}
                            {thunderVotes > 0 &&<span><i className={getMoodIcon( 'Thunder')}></i>&nbsp;{thunderVotes}&nbsp;&nbsp;</span>}
                            {snowVotes > 0 &&<span><i className={getMoodIcon( 'Snow')}></i>&nbsp;{snowVotes}&nbsp;&nbsp;</span>}
                            {windyVotes > 0 &&<span><i className={getMoodIcon( 'Windy')}></i>&nbsp;{windyVotes}&nbsp;&nbsp;</span>}
                    </div>
                    <div className="upvote">
                        <i id={`post-item-vote-${id}`} className='fa fa-plus'></i>
                        <div className="voteBox">
                            <i className={`${getMoodIcon( 'Clear')}`} onClick={this.handleClearVote}></i>&nbsp;
                            <i className={`${getMoodIcon( 'Clouds')}`} onClick={this.handleCloudsVote}></i>&nbsp;
                            <i className={`${getMoodIcon( 'Drizzle')}`} onClick={this.handleDrizzleVote}></i>&nbsp;
                            <i className={`${getMoodIcon( 'Rain')}`} onClick={this.handleRainVote}></i>&nbsp;
                            <i className={`${getMoodIcon( 'Thunder')}`} onClick={this.handleThunderVote}></i>&nbsp;
                            <i className={`${getMoodIcon( 'Snow')}`} onClick={this.handleSnowVote}></i>&nbsp;
                            <i className={`${getMoodIcon( 'Windy')}`} onClick={this.handleWindyVote}></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleClearVote(){
        this.props.onVote(this.props.id, 'CLear');
    }

    handleCloudsVote(){
        this.props.onVote(this.props.id, 'Clouds');
    }

    handleDrizzleVote(){
        this.props.onVote(this.props.id, 'Drizzle');
    }

    handleRainVote(){
        this.props.onVote(this.props.id, 'Rain');
    }

    handleThunderVote(){
        this.props.onVote(this.props.id, 'Thunder');
    }

    handleSnowVote(){
        this.props.onVote(this.props.id, 'Snow');
    }

    handleWindyVote(){
        this.props.onVote(this.props.id, 'Windy');
    }
}

