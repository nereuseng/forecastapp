<<<<<<< HEAD:client-side/src/component/Suggestion.jsx
import React, { Component } from 'react';

import 'component/Suggestion.css';

export default class Suggestion extends Component{
    render(){
        return(
            <div id="sugg" className={this.position()}>
            {/* <div id="sugg" className="secondRow"> */}
                {/* <ul> */}
                    <li onClick={this.handleClick}>Taichung</li>
                    <li onClick={this.handleClick}>Hualien</li>
                    <li onClick={this.handleClick}>Yilan</li>
                    <li onClick={this.handleClick}>Tainan</li>
                    <li onClick={this.handleClick}>Miaoli</li>
                    <li onClick={this.handleClick}>Kaohsiung</li> 
                {/* </ul> */}
            </div>
        );
    }

    constructor(props){
        super(props);
        this.state = {
            number: 0,
        }
        this.handleClick = this.handleClick.bind(this);
        this.play = this.play.bind(this);
        this.position = this.position.bind(this);
    }

    handleClick(event){
        // alert(event.target.innerText);
        this.props.onQuery(event.target.innerText, this.props.unit);
    }

    componentDidMount(){
        this.autoplay();
    }

    autoplay(){
        setInterval(this.play, 3000)
    }

    play(){
        let indexNew = this.state.number+1;
        if(indexNew>1){
            indexNew = 0;
        }

        this.setState({
            number: indexNew,
        })
        // console.log(this.state.number)
    }

    position(){
        switch (this.state.number) {
            case 0: return "firstRow";
            case 1: return "secondRow";
        }
    }
}
=======
import React, { Component } from 'react';

import {connect} from 'react-redux';

import 'component/Suggestion.css';

class Suggestion extends Component{
    render(){
        return(
            <div id="sugg" className={this.position()}>
            {/* <div id="sugg" className="secondRow"> */}
                {/* <ul> */}
                    <li onClick={this.handleClick}>Taichung</li>
                    <li onClick={this.handleClick}>Hualien</li>
                    <li onClick={this.handleClick}>Yilan</li>
                    <li onClick={this.handleClick}>Tainan</li>
                    <li onClick={this.handleClick}>Miaoli</li>
                    <li onClick={this.handleClick}>Kaohsiung</li> 
                {/* </ul> */}
            </div>
        );
    }

    constructor(props){
        super(props);
        this.state = {
            number: 0,
        }
        this.handleClick = this.handleClick.bind(this);
        this.play = this.play.bind(this);
        this.position = this.position.bind(this);
    }

    handleClick(event){
        // alert(event.target.innerText);
        this.props.onQuery(event.target.innerText, this.props.unit);
    }

    componentDidMount(){
        this.autoplay();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    autoplay(){
        this.interval = setInterval(this.play, 3000)
    }

    play(){
        let indexNew = this.state.number+1;
        if(indexNew>1){
            indexNew = 0;
        }

        this.setState({
            number: indexNew,
        })
        // console.log(this.state.number)
    }

    position(){
        switch (this.state.number) {
            case 0: return "firstRow";
            case 1: return "secondRow";
        }
    }
}

export default connect((state) => {    
    return {
        unit: state.unit,
    };
})(Suggestion);
>>>>>>> dba765455248190ce58d2a68b6fc9050674c49b3:src/component/Suggestion.jsx
