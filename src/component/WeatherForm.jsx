import React, { Component } from 'react';
import 'component/WeatherForm.css';

export default class WeatherForm extends Component{
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name='city' placeholder="Type the city name." value={this.state.inputValue} ref='inputCity' onChange={this.handleInputChange}/>&nbsp;&nbsp;
                    <select value={this.state.unit} onChange={this.handleUnit}>
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
        
        this.state = {
            inputValue: props.city,
            unit: props.unit,
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUnit = this.handleUnit.bind(this);
        this.handleLocation = this.handleLocation.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputValue: nextProps.city,
            unit: nextProps.unit
        });
    }

    handleLocation(event){
        event.preventDefault();

        this.props.onLocation();
    }

    handleInputChange(event) {
        this.setState({inputValue: event.target.value});
        // TODO 要怎麼看到輸入的inputValue是Taipei?
    }

    handleUnit(event) {
        this.setState({unit: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();

        this.refs.inputCity.blur();
        if (this.state.inputValue && this.state.inputValue.trim()) {
            this.props.onQuery(this.state.inputValue, this.state.unit);
        } else {
            this.setState({inputCity: this.props.city});
        }
        // TODO： Exception of typo/
        //保持原樣？ bangkokk?
        // 讓他不會多按幾次就跳出原本City的字串
    }
}