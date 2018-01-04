import React, { Component } from 'react';
import Today from 'Today/Today.jsx';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Forecast from 'Forecast/Forecast.jsx';
import {unit, weather, weatherForm,  forecast} from 'states/weather-reducers.js';
import {post} from 'states/post.reducer.js'

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';

import 'component/NavBar.css';
import { create } from 'domain';



export default class App extends React.Component {
  render() {
    return (
      //Nav css借我放.app的設置
    <Provider store={this.store}>  
      <Router>  
        <div className="app">  
          <nav className="nav">
            <ul>
              <li className="appname">Weather</li>
                        {/* className="current" 要怎麼現實當前頁面被選擇的highlight？ */}
              <li><Link to="/">Today</Link></li>
              <li><Link to="/Forecast">Forecast</Link></li>
              <div id="todaySearchBox">
              <input type="text" placeholder="Search..." value={this.state.searchText} onKeyPress={this.handleSearchKeyPress} className="search"></input>{
                  this.state.searchText &&
                  <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>
                }
              </div>
            </ul> 
          </nav>
        <Route exact path="/" render={() => (
          <Today searchText={this.state.searchText}  lat={this.state.lat} lng={this.state.lng} onUserLocationChange={this.handleLocationChange} onUnitChange = {this.handleUnitChange}/>
            )}/>
          <Route exact path="/Forecast" render={() =>(
          <Forecast unit={this.state.unit} lat={this.state.lat} lng={this.state.lng} onUserLocationChange={this.handleLocationChange} onUnitChange = {this.handleUnitChange}/>
            )}/>
        </div>
      </Router>
    </Provider>  
    );
  }
  // unit={this.state.unit}
  constructor(props){
    super(props);
    this.state = {
      lat: 25.105497,
      lng: 121.597366,
      searchText: ""
    };
    this.store = null;
    // this.searchEl = null;

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    // this.handleClearSearch = this.handleClearSearch.bind(this);
  }

  componentWillMount() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this.store = createStore(combineReducers({
      unit,
      weather,
      weatherForm,
      forecast,
      post
    }), composeEnhancers(applyMiddleware(thunkMiddleware)));
  }
  handleUnitChange(unit){
    this.setState({
      unit: unit,
    });
  }

  handleLocationChange(lat, lng){
    this.setState({
      lat: lat,
      lng: lng
    })
  }

  handleSearchKeyPress(e){
    const keyCode = e.keyCode || e.which;
    if(keyCode === 13){
      this.setState({
        searchText: e.target.value
      })
    }
  }

  handleSearchChange(e){
    this.setState({
      searchText: e.target.value
    });
  }

  // handleClearSearch(){
  //   this.setState({
  //     searchText: ''
  //   })
  // }

}
