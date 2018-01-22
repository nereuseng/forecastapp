import React, { Component } from 'react';
import 'component/WeatherForm.css';

import {connect} from 'react-redux';
import {input, selectUnit} from 'states/weather-actions.js'

class WeatherForm extends Component{
    render() {
        const {inputValue, unit} = this.props;
        console.log(this.props);
        

        return (
            <div className="weatherForm">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name='city' placeholder="Type the city name." value={inputValue} ref='inputCity' onChange={this.handleInputChange}/>&nbsp;&nbsp;
                    <select value={unit} onChange={this.handleUnit}>
                        <option value="metric">&ordm;C</option>
                        <option value="imperial">&ordm;F</option>
                    </select>&nbsp;&nbsp;
                    <button type="submit">Check</button>&nbsp;&nbsp;
                    <button onClick={this.handleLocation}>Location</button>
                </form>
                
            </div>
        );
    }

    constructor(props){
        super(props);
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUnit = this.handleUnit.bind(this);
        this.handleLocation = this.handleLocation.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(selectUnit(this.props.defaultUnit));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.city !== this.props.city) {
            this.props.dispatch(input(nextProps.city));
    }
    }

    handleLocation(event){
        event.preventDefault();

        this.props.onLocation();
    }

    handleInputChange(event) {
        this.props.dispatch(input(event.target.value));
        // TODO 要怎麼看到輸入的inputValue是Taipei?
    }

    handleUnit(event) {
        this.props.dispatch(selectUnit(event.target.value))
    }

    handleSubmit(event){
        event.preventDefault();

        this.refs.inputCity.blur();
        const {inputValue, city, unit, dispatch} = this.props;
        if (inputValue && inputValue.trim()) {
            dispatch(this.props.submitAction(inputValue, unit));
        } else {
            dispatch(input(city));
        }
        // TODO： Exception of typo/
        //保持原樣？ bangkokk?
        // 讓他不會多按幾次就跳出原本City的字串
    }
}

export default connect((state) => {
    return state.weatherForm;
})(WeatherForm);