import React, { Component } from 'react';

export default class WeatherForm extends Component{
    render() {
        return (
            <div className={`weather-form${this.props.masking ? '-masking' : ''}`}>
                <form onSubmit={this.handleSubmit}>
                    {/* //value設定了之後沒辦法改動，只能用onchange來變動 #react component的概念 */}
                    <input type="text" name='city' placeholder="Type the city name." value={this.state.inputValue} ref='inputCity' onChange={this.handleInputChange}/>&nbsp;&nbsp;
                    <select value={this.state.unit} onChange={this.handleUnit}>
                        <option value="metric">&ordm;C</option>
                        <option value="imperial">&ordm;F</option>
                    </select>&nbsp;&nbsp;
                    <button type="submit">Check</button>
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

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputValue: nextProps.city,
            unit: nextProps.unit
        });
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
        // console.log(event); no way to show event??

        this.refs.inputCity.blur();
        if (this.state.inputValue && this.state.inputValue.trim()) {
            this.props.onQuery(this.state.inputValue, this.state.unit);
        } else {
            this.setState({inputCity: this.props.city});
        }
        //保持原樣？ bangkokk?
        // 讓他不會多按幾次就跳出原本City的字串
    }
}