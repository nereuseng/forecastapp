import React , {Component} from 'react';
import {dropdownButton, clickOutside} from './dropdownButton.js';
// import {getWeather, getLocationWeatherToday} from 'Api/openWeatherMapApi.js';

import './PostItem.css';

export default class PostItem extends Component {
    render(){
        return (
            <div>
                <div className="postBody">
                    <button onClick={this.handleDropdown}  className="dropdownButton">{this.state.mood ==='na' ? 'Mood' :this.state.mood}</button>
                    <div id="dropdownItemSelector" className="dropdownItem">
                        <i onClick={() => this.handleDropdownSelect('Clear')}>Clear</i>
                        <i onClick={() => this.handleDropdownSelect('Clouds')}>Clouds</i>
                        <i onClick={() => this.handleDropdownSelect('Drizzle')}>Drizzle</i>
                        <i onClick={() => this.handleDropdownSelect('Rain')}>Rain</i>
                        <i onClick={() => this.handleDropdownSelect('Thunder')}>Thunder</i>
                        <i onClick={() => this.handleDropdownSelect('Snow')}>Snow</i>
                        <i onClick={() => this.handleDropdownSelect('Windy')}>Windy</i>
                    </div>
                    <input type="textarea" placeholder="What's on your mind?" value={this.state.inputValue} onChange={this.handleInputChange}/>
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
        this.props.onPost(this.state.mood, this.state.inputValue);
    }


}