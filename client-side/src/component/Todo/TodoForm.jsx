import React , {Component} from 'react';

import {dropdownButton, clickOutside} from 'Utility/dropdownButton.js';

import './TodoForm.css';

import {getMoodIcon} from 'Utility/formIcon.js';

import {connect} from 'react-redux';
import {input, selectMood, resetTodoForm} from 'states/todo-action.js'

class TodoForm extends Component {
    render(){
        const {inputValue, mood} = this.props;
        
        return (
            // <div>
                <div className="todoBody">
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

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.passEvent = this.passEvent.bind(this);
    }

    handleDropdown(){
        dropdownButton();
    }

    handleDropdownSelect(mood){
        this.props.dispatch(selectMood(mood));
    }

    handleInputChange(event){
        this.props.dispatch(input(event.target.value));
    }

    handlePost(){
        if (this.props.mood === 'na'){
            return document.getElementById("dropdownItemSelector").classList.add("show");
        }
        if (this.props.inputValue == ''){
            return this.formInput.focus();
        }
        const {inputValue, mood, dispatch} = this.props;
        dispatch(this.props.onTodo(mood, inputValue));
        dispatch(resetTodoForm());
    }
}

export default connect((state) => {
    return {
        ...state.todoForm
    };
})(TodoForm);