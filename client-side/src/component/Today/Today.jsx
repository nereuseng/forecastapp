import React, { Component } from 'react';
import WeatherDisplay from 'Today/WeatherDisplay.jsx';
import WeatherForm from 'component/WeatherForm.jsx';
import Suggestion from 'component/Suggestion.jsx';
import PostForm from 'component/Post/PostForm.jsx';
import PostList from 'component/Post/PostList.jsx';
// import {getLocationWeatherToday} from 'Api/openWeatherMapApi.js';
import {getUserLocation} from 'component/userLocation.jsx';

import {connect} from 'react-redux';
import {getWeather, getLocationWeatherToday} from 'states/weather-actions.js';
import {createPost, listPost, createVote} from 'states/post-actions.js';

import 'Today/Today.css';

class Today extends React.Component{
    
    render() {
        // TODO: Random pic without Math.random not doing twice
        const {city, group, description, temp, unit, masking, code, posts, mood, text, searchText} = this.props;
        const postLoading = false;     
        // console.log(this.props);
           
        
        var imgUrl = require('images/w-bg-'+group+'.jpg');

        document.getElementById('root').style.background = `url('${imgUrl}') fixed`;
        document.getElementById('root').style.backgroundSize = `cover`;
        

        return (
            <div className={`weather-bg-mask${this.props.masking ? '-masking' : ''}`}>
                <WeatherDisplay {...{group, description, temp, unit, masking, code}} day='today'/> 
                <WeatherForm city={city} defaultUnit={unit} onLocation={this.handleUserLocation} submitAction={getWeather}/>
                
                <Suggestion onQuery={this.handleQuery}/>
                
                <PostForm onPost={createPost} mood={mood}/>
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
        }
        
        this.handleUserLocation = this.handleUserLocation.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
        // this.handleCreatePost = this.handleCreatePost.bind(this); 
        // this.handleCreateVote = this.handleCreateVote.bind(this);
    }
    
    componentDidMount() {
        this.props.dispatch(listPost(this.props.searchText));
        this.props.dispatch(getWeather ('Taipei', this.props.unit));
    }

    componentWillUnmount() {
        // if (this.state.weatherLoading) {
        //     cancelWeather();
        // }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText){
            // console.log(`listPost!!`);
            
            this.props.dispatch(listPost(nextProps.searchText));
        }
    }

    handleUserLocation(){
        this.props.dispatch(getLocationWeatherToday(this.props.unit));
    }

    notifyUserLocation(lat, lng){
        if(this.props.lat !== lat && this.props.lng !== lng){
            this.props.onUserLocationChange(lat, lng);
        }
        
    }

    handleQuery(city) {       
        this.props.dispatch(getWeather (city, this.props.unit));
    }
}

export default connect((state, ownProps) => {    
    return {
        ...state.weather,
        ...state.post,
        ...state.PostForm,
        ...state.vote,
        ...state.location,
        searchText: ownProps.searchText,
        unit: state.unit,
    };
})(Today);