import React , {Component} from 'react';

import {dropdownButton, clickOutside} from 'Utility/dropdownButton.js';

import './TodoForm.css';

import {getMoodIcon} from 'Utility/formIcon.js';

import {connect} from 'react-redux';
import {input, selectMood, resetForm} from 'states/todo-action.js'

class TodoForm extends Component {
    render(){
        const {inputValue, mood} = this.props;
        
        return (
            // <div>
                <div className="todoBody">
                    <button onClick={this.handleDropdown}  className="dropdownButton"><i className={getMoodIcon(mood)}></i>&nbsp;{mood ==='na' ? 'Mood' :mood}</button>
                    <div id="dropdownItemSelector" className="dropdownItem">
                        <div onClick={() => this.handleDropdownSelect('Clear')}><i className={getMoodIcon('Clear')}></i>&nbsp;&nbsp;Clear</div>
                        <div onClick={() => this.handleDropdownSelect('Clouds')}><i className={getMoodIcon('Clouds')}></i>&nbsp;&nbsp;Clouds</div>
                        <div onClick={() => this.handleDropdownSelect('Drizzle')}><i className={getMoodIcon('Drizzle')}></i>&nbsp;&nbsp;Drizzle</div>
                        <div onClick={() => this.handleDropdownSelect('Rain')}><i className={getMoodIcon('Rain')}></i>&nbsp;&nbsp;Rain</div>
                        <div onClick={() => this.handleDropdownSelect('Thunder')}><i className={getMoodIcon('Thunder')}></i>&nbsp;&nbsp;Thunder</div>
                        <div onClick={() => this.handleDropdownSelect('Snow')}><i className={getMoodIcon('Snow')}></i>&nbsp;&nbsp;Snow</div>
                        <div onClick={() => this.handleDropdownSelect('Windy')}><i className={getMoodIcon('Windy')}></i>&nbsp;Windy</div>
                    </div>
                    <textarea id="textarea" rows="2" cols="30" placeholder="What's your todo?" value={inputValue} onChange={this.handleInputChange} ref={(input) => this.formInput = input}/>
                    
                    <button onClick={this.handleTodo}  className="dropdownButton">Post</button>
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
        this.handleTodo = this.handleTodo.bind(this);
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

    handleTodo(){
        if (this.props.mood === 'na'){
            return document.getElementById("dropdownItemSelector").classList.add("show");
        }
        if (this.props.inputValue == ''){
            return this.formInput.focus();
        }
        const {inputValue, mood, dispatch} = this.props;
        dispatch(this.props.onTodo(mood, inputValue));
        dispatch(resetForm());
    }
}

export default connect((state) => {
    return {
        ...state.todoForm
    };
})(TodoForm);