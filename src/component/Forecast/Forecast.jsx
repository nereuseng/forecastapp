import React, {Component} from 'react';
import 'Forecast/Forecast.css';
import {getForecast , getLocationWeather} from 'Api/openWeatherMapApi.js';
import WeatherForm from 'component/WeatherForm.jsx';
import {getUserLocation} from 'component/userLocation.jsx';
import WeatherTable from 'Forecast/WeatherTable.jsx';
import WeatherMap from 'Forecast/weatherMap.jsx';

export default class forecast extends Component {
    render(){
        return(
        <div >
            <div className={`map`}>
            <WeatherMap lat={this.props.lat} lng={this.props.lng} onClick={this.handleClick}/>
            <div className={`forecast-bg-mask${this.state.masking ? '-masking' : ''}`}>
                <WeatherTable {...this.state} unit={this.props.unit} />
                <WeatherForm city={this.state.city} unit={this.props.unit} onLocation={this.handleUserLocation} onQuery={this.handleQuery}/>
                {/* weatherform還需要masking的參數嗎？ Ans：不需要*/}
            </div>
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
            date: [-1,-1,-1,-1,-1],
            lat: this.props.lat,
            lng: this.props.lng
        }

        this.handleQuery = this.handleQuery.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleUserLocation = this.handleUserLocation.bind(this);
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
                // this.props.lat = weather.lat;
                // this.props.lng = weather.lng;
            // 利用then()確定上面的masking完成後，才完成把masknig拿掉的步驟
            }).then( () => setTimeout(() => {
                this.setState({
                    masking: false
                });
            }, 600));
        });

        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }


        // if(this.state.masking){
        //     setTimeout(() => {
        //         this.setState({
        //             masking: false
        //         });
        //     }, 1000)
        // }
    }
    handleQuery(city, unit) {
        this.getForecast(city, unit);
    }
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

        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }
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

    notifyUnitChange(unit) {
        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }
    }

    notifyUserLocation(lat, lng){
        if(this.props.lat !== lat && this.props.lng !== lng){
            this.props.onUserLocationChange(lat, lng);
        }
    }
    

    // getLocationWeather(lat, lng, unit){
    //     this.setState = ({
    //         lat: lat,
    //         lng: lng
    //     }, () => {

    //     //結論：糾結了一整個下午，為什麼加了上面的setState會導致Infinity Loop呢？
    //         getLocationWeather(lat, lng, unit).then(weather => {
    //             this.setState ({
    //                 ...weather,
    //                 masking: true
    //             }); alert(JSON.stringify(this.state.city));  
    //         });
    //     });

    //     if (this.props.units !== unit) {
    //         this.props.onUnitChange(unit);
    //     }

    //     setTimeout(() => {
    //         this.setState({
    //             masking: false
    //         });
    //     }, 600)
    // }
}