import React, { Component } from 'react';
import './App.css';
import Today from './Today.jsx';
import Forecast from './Forecast.jsx';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <nav className="nav">
            <ul>
              <li>Weather</li>
                        {/* className="current" 要怎麼現實當前頁面被選擇的highlight？ */}
              <li><Link to="/">Today</Link></li>
              <li><Link to="/">Forcast</Link></li>
            </ul> 
          </nav>

        <Switch>
        <Route exact path="/" render={() => (
          <Today unit={this.state.unit} onUnitChange = {this.handleUnitChange}/>
            )}/>
          <Route exact path="/" render={() =>(
          <Forecast unit={this.state.unit} onUnitChange = {this.handleUnitChange}/>
            )}/>
        </Switch>
        </Router>
          <Today unit={this.state.unit}/>
      </div>
    );
  }
  constructor(props){
    super(props);
    this.state = {
      unit: 'metric'
    }  
  }

  handleUnitChange(unit){
    this.setState({
      unit: unit
    })
  }

}

export default App;
