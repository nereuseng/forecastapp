import React, {Component} from 'react';
import './App.css';
import {getForecast} from './openWeatherMapApi.js';
import WeatherForm from './WeatherForm.jsx';
import WeatherTable from './WeatherTable.jsx'

export default class forecast extends Component {
    render(){

        var imgUrl = require(`./images/w-bg-${this.state.group[0]}.jpg`);
        const weatherbg = {         
            backgroundImage: 'url('+imgUrl+')',
            // backgroundColor: 'black',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // position: 'fixed',
            width: '100%',
            height: '100%',
        }

        return(
        <div style={weatherbg}>
            <div className={`weather-bg-mask${this.state.masking ? '-masking' : ''}`}>
                <WeatherTable {...this.state} unit={this.props.unit}/>
                <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleQuery} masking={this.state.masking}/>
                {/* weatherform還需要masking的參數嗎？ */}
            </div>
        </div>        
        )
    }

    constructor(props) {
        super(props);

        this.state = {
            masking: true,
            code: [-1,-1,-1,-1,-1],
            temp: [NaN,NaN,NaN,NaN,NaN],
            desc: ['N/A','N/A','N/A','N/A','N/A'],
            city: 'na',
            group: ['na','na','na','na','na'],
            date: [-1,-1,-1,-1,-1]
        }

        this.handleQuery = this.handleQuery.bind(this);
    }

    componentDidMount(){
        this.getForecast('Taipei', 'metric');
    }

    componentWillUnmount() {

    }

    getForecast(city, unit){
        this.setState({
            city: city
        }, () => {
            getForecast(city, unit).then(weather => {
                this.setState ({
                    ...weather,
                    masking: true
                }); 
            });
        });

        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }

        setTimeout(() => {
            this.setState({
                masking: false
            });
        }, 600)
    }

    handleQuery(city, unit) {
        this.getForecast(city, unit);
    }

    
}