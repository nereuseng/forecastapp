import React, { Component } from 'react';
import WeatherDisplay from 'Today/WeatherDisplay.jsx';
import WeatherForm from 'component/WeatherForm.jsx';
import Suggestion from 'component/Suggestion.jsx';
import PostForm from 'component/Post/PostForm.jsx';
import PostList from 'component/Post/PostList.jsx';
import {getLocationWeatherToday} from 'Api/openWeatherMapApi.js';
import {getUserLocation} from 'component/userLocation.jsx';
import {listPost, createVote} from 'Api/post.js';

import {connect} from 'react-redux';
import {getWeather} from 'states/weather-actions.js';
import {createPost} from 'states/post-actions.js';

import 'Today/Today.css';

class Today extends React.Component{
    
    render() {
        // TODO: Random pic without Math.random not doing twice
        const {city, group, description, temp, unit, masking, code, posts} = this.props;
        const postLoading = false;
        console.log(this.props);
        
        var imgUrl = require('images/w-bg-'+group+'.jpg');

        document.getElementById('root').style.background = `url('${imgUrl}') fixed`;
        document.getElementById('root').style.backgroundSize = `cover`;
        

        return (
            <div className={`weather-bg-mask${this.props.masking ? '-masking' : ''}`}>
                <WeatherDisplay {...{group, description, temp, unit, masking, code}} day='today'/> 
                <WeatherForm city={city} defaultUnit={unit} onLocation={this.handleUserLocation} submitAction={getWeather}/>
                
                <Suggestion onQuery={this.handleQuery} unit={this.props.unit}/>
                
                <PostForm onPost={createPost}/>
                <PostList posts={posts} onVote={this.handleCreateVote}/>{
                    postLoading &&
                    <span>Loading...</span>
                }
            </div>
        );
    }
    constructor(props){
        super(props);
        this.state={
            lat: this.props.lat,
            lng: this.props.lng,
            // posts: []
        }
        
        this.handleUserLocation = this.handleUserLocation.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this); 
        this.handleCreateVote = this.handleCreateVote.bind(this);
    }
    
    componentDidMount() {
        this.props.dispatch(getWeather ('Taipei', this.props.unit));
        // this.props.getWeather ('Taipei', this.props.unit);
        this.props.dispatch(getWeather ('Taipei', this.props.unit));
        // this.listPost(this.props.searchText);
    }

    componentWillUnmount() {
        // if (this.state.weatherLoading) {
        //     cancelWeather();
        // }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText){
            this.listPost(nextProps.searchText);
        }
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

    handleCreateVote(id, mood){
        createVote(id, mood).then( () =>{
            this.listPost(this.props.searchText)
        })
    }  
}

export default connect((state) => {
    return {
        ...state.weather,
        ...state.post,
        unit: state.unit,
    };
})(Today);