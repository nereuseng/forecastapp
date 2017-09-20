import React, {Component} from 'react';
import './App.css';
import {getForecast , getLocationWeather} from './openWeatherMapApi.js';
import WeatherForm from './WeatherForm.jsx';
import WeatherTable from './WeatherTable.jsx';
import WeatherMap from './weatherMap.jsx';

export default class forecast extends Component {
    render(){

        // var imgUrl = require(`./images/w-bg-${this.state.group[0]}.jpg`);
        // const weatherbg = {         
        //     backgroundImage: 'url('+imgUrl+')',
        //     // backgroundColor: 'black',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundSize: 'cover',
        //     position: 'fixed',
        //     //放fixed是因為不用scroll
        //     width: '100%',
        //     height: '100%',
        // } 下面的DIV---->>style={weatherbg}

        return(
        <div >
            <div className={`map`}>
            <WeatherMap lat={this.state.lat} lng={this.state.lng} onClick={this.handleClick}/>
            <div className={`forecast-bg-mask${this.state.masking ? '-masking' : ''}`}>
                <WeatherTable {...this.state} unit={this.props.unit}/>
                <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleQuery} masking={this.state.masking}/>
                {/* weatherform還需要masking的參數嗎？ */}
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
            lat: 25.105497,
            lng: 121.597366
        }

        this.handleQuery = this.handleQuery.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
                });
            }).then( () => setTimeout(() => {
                this.setState({
                    masking: false
                });
            }, 600));
        });

        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }

        // setTimeout(() => {
        //     this.setState({
        //         masking: false
        //     });
        // }, 1000)
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