import React, { Component } from 'react';
import WeatherDisplay from './WeatherDisplay.jsx';
import WeatherForm from './WeatherForm.jsx';
import {getWeather} from './openWeatherMapApi.js';

export default class Today extends Component{
    
    render() {
        // TODO: Random pic without Math.random not doing twice
        var imgUrl = require(`./images/w-bg-${this.state.group}.jpg`);
        const weatherbg = {         
            backgroundImage: 'url('+imgUrl+')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'absolute',
            //為什麼一去掉position圖片就不見了？
            // zIndex: '-1',
            width: '100%',
            height: '100%',
        };

        return (
            <div style={weatherbg}>
                {/* how to put bg image in this DIV? 
                css: background image
                */}
                <div className={`weather-bg-mask${this.state.masking ? '-masking' : ''}`}>
                <WeatherDisplay {...this.state}/> 
                <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleQuery} masking={this.state.masking}/>
                </div>
            </div>
        );
    }

    constructor(props){
        super(props);
        this.state={
            code: '-1',
            temp: NaN,
            group: 'na',
            desc: 'N/A',
            city: 'na',
            masking: true,
        }
        
        this.handleQuery = this.handleQuery.bind(this);
    }
    
    //在DOM load好之後就開始執行
    //Child要收到更動，要在Child加上componentWillReceiveProps
    
    //2017-9-10：我那時候為什麼要寫componentWillReceiveProps? 為什麼在Forecast沒遇到這樣的問題？？
    componentDidMount() {
        this.getWeather ('Taipei', 'metric');
    }

    componentWillUnmount() {

    }

    handleQuery(city, unit){
        this.getWeather(city, unit);
    }
    
    getWeather(city, unit){
        this.setState({
            city: city
        }, () => {
        getWeather(city, unit).then(weather => {
        this.setState({
            ...weather,
            masking: true
            });
        }).then( () => setTimeout(() => {
                this.setState({
                    masking: false
                });
            }, 600));
        });

        //把transition換回去,上面用了比較優雅的方法
        // setTimeout(() => {
        //     this.setState({
        //         masking: false
        //     });
        // }, 600);
    }




    
}