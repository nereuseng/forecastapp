import React , {Component} from 'react';

import {dropdownButton, clickOutside} from './dropdownButton.js';
// import {getWeather, getLocationWeatherToday} from 'Api/openWeatherMapApi.js';

import './PostForm.css';

import {getMoodIcon} from './postIcon.js';

import {connect} from 'react-redux';
import {input, selectMood} from 'states/post-actions.js'

class PostForm extends Component {
    render(){
        const {inputValue, mood} = this.props;
        return (
            <div>
                <div className="postBody">
                    <button onClick={this.handleDropdown}  className="dropdownButton"><i className={getMoodIcon(mood)}></i>&nbsp;{mood ==='na' ? 'Mood' :mood}</button>
                    <div id="dropdownItemSelector" className="dropdownItem">
                        <i className={getMoodIcon('Clear')} onClick={() => this.handleDropdownSelect('Clear')}>&nbsp;&nbsp;Clear</i>
                        <i className={getMoodIcon('Clouds')} onClick={() => this.handleDropdownSelect('Clouds')}>&nbsp;&nbsp;Clouds</i>
                        <i className={getMoodIcon('Drizzle')} onClick={() => this.handleDropdownSelect('Drizzle')}>&nbsp;&nbsp;Drizzle</i>
                        <i className={getMoodIcon('Rain')} onClick={() => this.handleDropdownSelect('Rain')}>&nbsp;&nbsp;Rain</i>
                        <i className={getMoodIcon('Thunder')} onClick={() => this.handleDropdownSelect('Thunder')}>&nbsp;&nbsp;Thunder</i>
                        <i className={getMoodIcon('Snow')} onClick={() => this.handleDropdownSelect('Snow')}>&nbsp;&nbsp;Snow</i>
                        <i className={getMoodIcon('Windy')} onClick={() => this.handleDropdownSelect('Windy')}>&nbsp;Windy</i>
                    </div>
                    <textarea id="textarea" rows="2" cols="30" placeholder="What's on your mind?" value={inputValue} onChange={this.handleInputChange}/>
                    
                    <button onClick={this.handlePost}  className="dropdownButton">Post</button>
                </div>

            </div>
        )
    }
    componentDidMount(){
        window.onclick = () =>{
            var event = window.event;
            clickOutside(event);
        }
    }

    constructor(props){
        super(props);
        // this.state = {
        //     inputValue: "",
        //     mood: 'na'
        // }

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleDropdown(){
        dropdownButton();
    }

    handleDropdownSelect(mood){
        this.props.dispatch(selectMood(mood))
        // this.setState({mood: mood})
    }

    handleInputChange(event){
        this.props.dispatch(input(event.target.value))
        // this.setState({inputValue: event.target.value});
    }

    handlePost(){
        if (this.props.mood === 'na'){
            return document.getElementById("dropdownItemSelector").classList.add("show");
        }
        if (this.props.inputValue == ''){
            return document.getElementById("textarea").focus();
        }
        const {inputValue, mood, dispatch} = this.props;
        // this.props.onPost(this.state.mood, this.state.inputValue);
        dispatch(this.props.onPost(mood, inputValue));
        dispatch(this.props.onPost('na', ''));
        // this.setState({
        //     mood: 'na',
        //     inputValue: ''
        // });
    }
}

export default connect((state) => {
    return {
        ...state.postForm
    };
})(PostForm);