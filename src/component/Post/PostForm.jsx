import React , {Component} from 'react';
import {dropdownButton, clickOutside} from './dropdownButton.js';
// import {getWeather, getLocationWeatherToday} from 'Api/openWeatherMapApi.js';

import './PostForm.css';

import {getMoodIcon} from './postIcon.js';

export default class PostForm extends Component {
    render(){
        return (
            <div>
                <div className="postBody">
                    <button onClick={this.handleDropdown}  className="dropdownButton"><i className={getMoodIcon(this.state.mood)}></i>&nbsp;{this.state.mood ==='na' ? 'Mood' :this.state.mood}</button>
                    <div id="dropdownItemSelector" className="dropdownItem">
                        <i className={getMoodIcon('Clear')} onClick={() => this.handleDropdownSelect('Clear')}>&nbsp;&nbsp;Clear</i>
                        <i className={getMoodIcon('Clouds')} onClick={() => this.handleDropdownSelect('Clouds')}>&nbsp;&nbsp;Clouds</i>
                        <i className={getMoodIcon('Drizzle')} onClick={() => this.handleDropdownSelect('Drizzle')}>&nbsp;&nbsp;Drizzle</i>
                        <i className={getMoodIcon('Rain')} onClick={() => this.handleDropdownSelect('Rain')}>&nbsp;&nbsp;Rain</i>
                        <i className={getMoodIcon('Thunder')} onClick={() => this.handleDropdownSelect('Thunder')}>&nbsp;&nbsp;Thunder</i>
                        <i className={getMoodIcon('Snow')} onClick={() => this.handleDropdownSelect('Snow')}>&nbsp;&nbsp;Snow</i>
                        <i className={getMoodIcon('Windy')} onClick={() => this.handleDropdownSelect('Windy')}>&nbsp;Windy</i>
                    </div>
                    <textarea id="textarea" rows="2" cols="30" placeholder="What's on your mind?" value={this.state.inputValue} onChange={this.handleInputChange}/>
                    
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
        this.state = {
            inputValue: "",
            mood: 'na'
        }

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleDropdown(){
        dropdownButton();
    }

    handleDropdownSelect(mood){
        this.setState({mood: mood})
    }

    handleInputChange(event){
        this.setState({inputValue: event.target.value});
    }

    handlePost(){
        if (this.state.mood === 'na'){
            return document.getElementById("dropdownItemSelector").classList.add("show");
        }
        if (this.state.inputValue == ''){
            return document.getElementById("textarea").focus();
        }
        this.props.onPost(this.state.mood, this.state.inputValue);
        this.setState({
            mood: 'na',
            inputValue: ''
        });
    }


}