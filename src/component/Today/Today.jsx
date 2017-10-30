import React, { Component } from 'react';
import WeatherDisplay from 'Today/WeatherDisplay.jsx';
import WeatherForm from 'component/WeatherForm.jsx';
import Suggestion from 'component/Suggestion.jsx';
import PostItem from 'component/Post/PostItem.jsx';
import PostList from 'component/Post/PostList.jsx';
import {getWeather, getLocationWeatherToday} from 'Api/openWeatherMapApi.js';
import {getUserLocation} from 'component/userLocation.jsx';
import {createPost, listPost, createVote} from 'Api/post.js';

import 'Today/Today.css';

export default class Today extends Component{
    
    render() {
        // TODO: Random pic without Math.random not doing twice
        var imgUrl = require('images/w-bg-'+this.state.group+'.jpg');
        // const weatherbg = {         
        //     backgroundImage: 'url('+imgUrl+')',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundSize: 'cover',
        //     backgroundAttachment: 'fixed',

        //     width: '100%',

        // };

        document.body.style.background = `url('${imgUrl}') fixed`;
        document.body.style.backgroundSize = `cover`;
        // document.body.className = `weather-bg-mask${this.state.masking ? '-masking' : ''}`;
        // document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;
        

        return (
            // style={weatherbg}
            // 
            <div>
                <div className={`weather-bg-mask${this.state.masking ? '-masking' : ''}`}>
                <WeatherDisplay {...this.state}/> 
                <WeatherForm city={this.state.city} unit={this.props.unit} onLocation={this.handleUserLocation} onQuery={this.handleQuery} masking={this.state.masking}/>
                <Suggestion onQuery={this.handleQuery} unit={this.props.unit}/>
                <PostItem onPost={this.handleCreatePost}/>
                <PostList posts={this.state.posts}/>
                </div>
            </div>
        );
    }
/* onVote={this.handleCreateVote} */
    constructor(props){
        super(props);
        this.state={
            code: '-1',
            temp: NaN,
            group: 'na',
            desc: 'N/A',
            city: 'na',
            masking: true,
            lat: this.props.lat,
            lng: this.props.lng,
            posts: []
        }
        
        this.handleQuery = this.handleQuery.bind(this);
        this.handleUserLocation = this.handleUserLocation.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this); 
    }
    
    componentDidMount() {
        this.getWeather ('Taipei', 'metric');
        this.listPost(this.props.searchText);
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText){
            this.listPost(nextProps.searchText);
        }
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
    }

    masking() {
        setTimeout(() => {
            this.setState({
                masking: false
            });
        }, 600)
    }

    handleUserLocation(){
        getUserLocation().then(userCoords => {
            this.setState({
                lat: userCoords.coords.latitude,
                lng: userCoords.coords.longitude
            }, () => {
                this.notifyUserLocation(userCoords.coords.latitude, userCoords.coords.longitude)
                getLocationWeatherToday(this.state.lat, this.state.lng, this.props.unit).then(weather => {
                    this.setState({
                        ...weather,
                        masking:true
                    });
                }).then( this.masking())
            })
        })
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

    handleCreatePost(mood, text){
        console.log(mood, text);
        createPost(mood, text).then( () =>{
            this.listPost(this.props.searchText)
        })
    }

    listPost(searchText){
        listPost(searchText).then(posts =>{
            this.setState({
                posts: posts
            })
        })
    }
    
}