import React, {Component} from 'react';
import 'Forecast/Forecast.css';
import {getLocationWeather} from 'Api/openWeatherMapApi.js';
import WeatherForm from 'component/WeatherForm.jsx';
import {getUserLocation} from 'component/userLocation.jsx';
import WeatherTable from 'Forecast/WeatherTable.jsx';
import WeatherMap from 'Forecast/weatherMap.jsx';

import {connect} from 'react-redux';
import {getForecast} from 'states/weather-actions.js';

class Forecast extends Component {
    render(){
        const {unit, city, masking, list, forecastLoading} = this.props;

        return(
        <div >
            <div className={`map${masking ? '-masking' : ''}`}>
            <WeatherMap lat={this.props.lat} lng={this.props.lng} onClick={this.handleClick} masking={masking}/>
            <div className={`forecast-bg-mask`}>
                <WeatherTable unit={unit} {...list} city={city} masking={masking}/>
                <WeatherForm city={city} defaultUnit={unit} onLocation={this.handleUserLocation} submitAction={getForecast}/>
            </div>
            </div>
        </div>        
        )
    }

    constructor(props) {
        super(props);

        this.state = {
            lat: this.props.lat,
            lng: this.props.lng
        }

        // this.handleQuery = this.handleQuery.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleUserLocation = this.handleUserLocation.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(getForecast('Taipei', this.props.unit));
    }

    componentWillUnmount() {

    }

    // handleQuery(city, unit) {
    //     this.getForecast(city, unit);
    // }
    handleClick(lat, lng){
        this.getLocationWeather(lat, lng, this.props.unit);
        // alert("讓子彈飛一會兒");
    }

    getLocationWeather(lat, lng, unit){
        this.setState ({
            lat: lat,
            lng: lng
        }, () => {
        // alert('有飛到這裡嗎');
            getLocationWeather(lat, lng, unit).then(weather => {
                this.setState ({
                    ...weather,
                    masking: true
                }, () => this.notifyUnitChange(unit));
            }).then( () => setTimeout(() => {
                this.setState({
                    masking: false
                });
            }, 600));
        });

        // if (this.props.units !== unit) {
        //     this.props.onUnitChange(unit);
        // }
    }

    handleUserLocation(){
        getUserLocation().then(userCoords => {
            this.setState ({
                lat: userCoords.coords.latitude,
                lng: userCoords.coords.longitude
            }, () => {
                this.notifyUserLocation(userCoords.coords.latitude, userCoords.coords.longitude);
                this.getLocationWeather(this.state.lat, this.state.lng, this.props.unit);
            })
        })
    //         }, () => this.notifyUserLocation(userCoords.coords.latitude, userCoords.coords.longitude));
    //         alert(userCoords.coords.latitude);
    //     }
    //     }).then(, () => {
    //         alert(userCoords.coords.latitude);
    //         this.getLocationWeather(lat, lng, this.props.unit));
    }

    // notifyUnitChange(unit) {
    //     if (this.props.units !== unit) {
    //         this.props.onUnitChange(unit);
    //     }
    // }

    notifyUserLocation(lat, lng){
        if(this.props.lat !== lat && this.props.lng !== lng){
            this.props.onUserLocationChange(lat, lng);
        }
    }
}
    
export default connect((state) => {
    return {
        ...state.forecast,
        unit: state.unit
    };
})(Forecast);