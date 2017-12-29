import React, { Component } from 'react';
import 'Today/WeatherDisplay.css';

export default class WeatherDisplay extends Component{
    render() {

        return (
            
            <div className={`weather-display${this.props.masking ? '-masking' : ''}`}>
                <p className={`weatherDesc${this.props.masking ? '-masking' : ''}`}>{this.props.desc}</p>
                {/* <img src={require(`./images/w-${this.props.group}.png`)} alt="HTML5"/> */}
                <i className={`owf owf-${this.props.code} owf-5x`} id="overrideIconSize"></i>
                <h1>
                    {Math.round(this.props.temp)}&ordm;&nbsp;{this.props.unit === 'metric' ? 'C': 'F'}
                </h1>
            </div>
        );
    }
}