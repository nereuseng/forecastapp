import React, {Component} from 'react';
import 'Forecast/Forecast.css';
import {cancelForecast} from 'Api/openWeatherMapApi.js';
import WeatherForm from 'component/WeatherForm.jsx';
// import {getUserLocation} from 'component/userLocation.jsx';
import WeatherTable from 'Forecast/WeatherTable.jsx';
import WeatherMap from 'Forecast/weatherMap.jsx';

import {connect} from 'react-redux';
import {getForecast, getLocationForecast, getUserLocation, maskForecastBg, unmaskForecastBg} from 'states/weather-actions.js';
import TodoForm from './TodoForm.jsx';

class Forecast extends Component {
    render(){
        const {unit, city, masking, list, forecastLoading, lat, lng} = this.props;
        const todoLoading = false
        // console.log(`Forecast lat lng:`+ lat+ lng);
        
        return(
        <div >
            <div className={`map${masking ? '-masking' : ''}`}>
                <WeatherMap lat={lat} lng={lng} onClick={this.handleMapClick} masking={masking}/>
            </div>
            <div className="forecastBody">
                <div className={`forecast-bg-mask`}>
                    <WeatherTable unit={unit} {...list} city={city} masking={masking}/>
                    <WeatherForm city={city} defaultUnit={unit} onLocation={this.handleUserLocation} submitAction={getForecast}/>
                </div>
                <TodoForm />
            </div>{
                    (forecastLoading || todoLoading) &&
                    <span className="forecast-loading">Loading...</span>
                }
        </div>        
        )
    }

    constructor(props) {
        super(props);

        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleUserLocation = this.handleUserLocation.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(getForecast('Taipei', this.props.unit));
    }

    componentWillUnmount() {
        const {forecastLoading} = this.props
        if (forecastLoading) {           
            cancelForecast();
        }
    }

    handleMapClick(lat, lng){
        const {unit, dispatch} = this.props
        dispatch(getLocationForecast(lat, lng, unit));
        dispatch(unmaskForecastBg({forecastLoading: false}));
    }

    // 這個不就是和async的high order function一樣??
    // 而且在直接dispatch page這樣會不會很怪呢??
    async handleUserLocation(){   
        const {dispatch} = this.props;     

        dispatch(maskForecastBg({masking: true}));
        await dispatch(getUserLocation());
        const {lat, lng, unit} = this.props;
        
        dispatch(getLocationForecast(lat, lng, unit));

        setTimeout(() => {
            // loading要不要獨立處理變成startLoading?
            dispatch(unmaskForecastBg({masking: false, forecastLoading: false}));
        }, 600);
    }
}
    
export default connect((state) => {
    return {
        ...state.forecast,
        ...state.location,
        unit: state.unit,
    };
})(Forecast);