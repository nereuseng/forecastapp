import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    // Switch
} from 'react-router-dom'
import './NavBar.css';
import Today from './Today.jsx';
import Forecast from './Forecast.jsx';

// *********************
// NavBar Aborted.
// *********************

export default class NavBar extends Component{
    render() {
        return(
            <Router>
            <div>
              
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
                <Today unit={this.props.unit} onUnitChange = {this.handleUnitChange}/>
                  )}/>
                <Route exact path="/Forecast" render={() =>(
                <Forecast unit={this.props.unit} onUnitChange = {this.handleUnitChange}/>
                  )}/>
              {/* </Switch> */}
              
                <Today unit={this.state.unit}/>
            </div>
            </Router>
        );
    }

    constructor (props) {
        super(props);

        this.state = {
            unitChange : props.unit
        }
    }

    handleUnitChange(unit) {
        this.setState({
            unitChange: unit
        });
    }
}