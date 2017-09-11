import React, { Component } from 'react';
import './App.css';
import Today from './Today.jsx';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Forecast from './Forecast.jsx';
import './NavBar.css';

class App extends Component {
  render() {
    return (
      //NavBar component aborted,
      <Router>  
        <div className="App">  
          <nav className="nav">
            <ul>
              <li className="appname">Weather</li>
                        {/* className="current" 要怎麼現實當前頁面被選擇的highlight？ */}
              <li><Link to="/">Today</Link></li>
              <li><Link to="/Forecast">Forecast</Link></li>
            </ul> 
          </nav>

        {/* <Switch> */}
        <Route exact path="/" render={() => (
          <Today unit={this.state.unit} onUnitChange = {this.handleUnitChange}/>
            )}/>
          <Route exact path="/Forecast" render={() =>(
          <Forecast unit={this.state.unit} onUnitChange = {this.handleUnitChange}/>
            )}/>
        {/* </Switch> */}
        </div>
      </Router>  
    );
  }
  constructor(props){
    super(props);
    this.state = {
      unit: 'metric'
    }  
    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  handleUnitChange(unit){
    this.setState({
      unit: unit
    });
  }

}

export default App;
