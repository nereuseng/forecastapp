import React, { Component } from 'react';

export default class WeatherDisplay extends Component{
    render() {
        // 圖片的引入是一個大地雷 記得``在裡面是能用函數的
        return (
            <div className={`weather-display${this.props.masking ? '-masking' : ''}`}>
                <p className={`weatherDesc${this.props.masking ? '-masking' : ''}`}>{this.props.desc}</p>
                <img src={require(`./images/w-${this.props.group}.png`)} alt="HTML5"/>
                <h1>
                    {Math.round(this.props.temp)}&ordm;&nbsp;{this.props.unit === 'metric' ? 'C': 'F'}
                    {/* {this.props.city} 
                    {`weather-display${this.props.masking ? '-masking' : ''}`}
                    */}
                </h1>
                
            </div>
        );
    }
}