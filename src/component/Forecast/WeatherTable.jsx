import React, { Component } from 'react';

import {connect} from 'react-redux';
import {getWeather} from 'states/weather-actions.js';

import 'Forecast/WeatherTable.css';
import 'owfont/css/owfont-regular.css'  
// import Forecast from './Forecast';

class WeatherTable extends Component {
    render() {
        const {unit, list, city, masking} = this.props;
        return(
        <div className={`forecast-display${masking ? '-masking' : ''}`}>
            <div className={`weather-table${masking ? '-masking' : ''}`}>
                <h1>Forcast for {city} in 5 days: </h1>
                 <table className="table-rwd">
                    <tbody>
                    <tr>
                        <td className="td-only-hide">Days</td>
                        {list.map((m, index) => <td data-th="Days" key={index}>{m.date}</td>)}
                        {/* map的函數要加上index的參數， td裡面加上key */}
                    </tr>
                    <tr>
                        <td className="td-only-hide">Weather</td>
                        {list.map((m, index) =><td data-th="Weather" key={index}><i className={`owf owf-${m.code} owf-5x`}></i></td>)}
                    </tr>
                    <tr>
                        <td className="td-only-hide">Temperature</td>
                        {list.map((m, index) => <td data-th="Temp" key={index}>{Math.round(m.temp)}&ordm;&nbsp;{unit === 'metric' ? 'C': 'F'}</td>)}
                    </tr>
                    <tr>
                        <td className="td-only-hide">Description</td>
                        {list.map((m, index) => <td data-th="Desc" key={index}> {m.description}</td>)}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )}
}

export default connect((state) => {
    return {
        ...state.forecast,
        unit: state.unit
    };
})(WeatherTable);