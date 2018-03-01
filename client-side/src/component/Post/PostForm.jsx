import React , {Component} from 'react';

import {dropdownButton, clickOutside} from 'Utility/dropdownButton.js';

import './PostForm.css';

import {getMoodIcon} from 'Utility/formIcon.js';

import {connect} from 'react-redux';
import {input, selectMood, resetForm} from 'states/post-actions.js'

class PostForm extends Component {
    render(){
        const {inputValue, mood} = this.props;
        
        return (
            // <div>
                <div className="postBody">
                    <button onClick={this.handleDropdown}  className="dropdownButton"><i className={getMoodIcon(mood)}></i>&nbsp;{mood ==='na' ? 'Mood' :mood}</button>
                    <div id="dropdownItemSelector" className={`dropdownItem ${this.state.showDropdown ? `show` : ''}`}>
                        <div><i className={getMoodIcon('Clear')} onClick={() => this.handleDropdownSelect('Clear')}></i>&nbsp;&nbsp;Clear</div>
                        <div><i className={getMoodIcon('Clouds')} onClick={() => this.handleDropdownSelect('Clouds')}></i>&nbsp;&nbsp;Clouds</div>
                        <div><i className={getMoodIcon('Drizzle')} onClick={() => this.handleDropdownSelect('Drizzle')}></i>&nbsp;&nbsp;Drizzle</div>
                        <div><i className={getMoodIcon('Rain')} onClick={() => this.handleDropdownSelect('Rain')}></i>&nbsp;&nbsp;Rain</div>
                        <div><i className={getMoodIcon('Thunder')} onClick={() => this.handleDropdownSelect('Thunder')}></i>&nbsp;&nbsp;Thunder</div>
                        <div><i className={getMoodIcon('Snow')} onClick={() => this.handleDropdownSelect('Snow')}></i>&nbsp;&nbsp;Snow</div>
                        <div><i className={getMoodIcon('Windy')} onClick={() => this.handleDropdownSelect('Windy')}></i>&nbsp;Windy</div>
                    </div>
                    <textarea id="textarea" rows="2" cols="30" placeholder="What's on your mind?" value={inputValue} onChange={this.handleInputChange} ref={(input) => this.formInput = input}/>
                    
                    <button onClick={this.handlePost}  className="dropdownButton">Post</button>
                </div>

            // </div>
        )
    }
    componentDidMount(){
        window.addEventListener('click', this.passEvent);
        this.props.dispatch(selectMood('na'));
        this.props.dispatch(input(''));
    }

    passEvent() {
        var event = window.event;
        clickOutside(event);
    }

    componentWillUnmount() {       
        window.removeEventListener('click', this.passEvent);
    }

    constructor(props){
        super(props);
        this.state = {
            showDropdown: false
        }

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.passEvent = this.passEvent.bind(this);
    }

    handleDropdown(){
        // dropdownButton();
        this.setState((prevState) => {
            return {showDropdown: !prevState.showDropdown};
        });
    }

    handleDropdownSelect(mood){
        this.props.dispatch(selectMood(mood));
    }

    handleInputChange(event){
        this.props.dispatch(input(event.target.value));       
    }

    handlePost(){
        if (this.props.mood === 'na'){
            return this.setState({showDropdown: true})
        }
        if (this.props.inputValue == ''){
            return this.formInput.focus();
        }
        const {inputValue, mood, dispatch} = this.props;
        dispatch(this.props.onPost(mood, inputValue));
        dispatch(resetForm());
    }
}

export default connect((state) => {
    return {
        ...state.postForm
    };
})(PostForm);