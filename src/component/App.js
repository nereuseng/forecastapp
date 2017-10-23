import React, { Component } from 'react';
import Today from 'Today/Today.jsx';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Forecast from 'Forecast/Forecast.jsx';
import 'component/NavBar.css';

class App extends Component {
  render() {
    return (
      <Router>  
        <div className="App">  
          <nav className="nav">
            <ul>
              <li className="appname">Weather</li>
                        {/* className="current" 要怎麼現實當前頁面被選擇的highlight？ */}
              <li><Link to="/">Today</Link></li>
              <li><Link to="/Forecast">Forecast</Link></li>
              <input type="text" placeholder="Search..." onKeyPress={this.handleSearchKeyPress}></input>
            </ul> 
          </nav>
        <Route exact path="/" render={() => (
          <Today searchText={this.state.searchText} unit={this.state.unit} lat={this.state.lat} lng={this.state.lng} onUserLocationChange={this.handleLocationChange} onUnitChange = {this.handleUnitChange}/>
            )}/>
          <Route exact path="/Forecast" render={() =>(
          <Forecast unit={this.state.unit} lat={this.state.lat} lng={this.state.lng} onUserLocationChange={this.handleLocationChange} onUnitChange = {this.handleUnitChange}/>
            )}/>
        </div>
      </Router>  
    );
  }
  constructor(props){
    super(props);
    this.state = {
      unit: 'metric',
      lat: 25.105497,
      lng: 121.597366,
      searchText: ""
    }  
    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
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

}

export default App;
