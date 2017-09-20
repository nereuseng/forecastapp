import React, { Component } from 'react';
import './App.css';
import './owfont-master/css/owfont-regular.css'
// import './WeatherTable.css';

export default class WeatherTable extends Component {
    render() {
        return(
        <div className={`forecast-display${this.props.masking ? '-masking' : ''}`}>
            <div className={`weather-table${this.props.masking ? '-masking' : ''}`}>
                <h1>Forcast for {this.props.city} in 5 days: </h1>
                <table className="table-rwd">
                    {/* <tr className="tr-only-hide">
                        <th>Days</th>
                        <th>Weather</th>
                        <th>Temperature</th>
                        <th>Description</th>
                    </tr> */}
                    <tr>
                        <td>Days</td>
                        {this.props.date.map((m) => <td data-th="Days">{m}</td>)}
                        {/* <i class="owf owf-800-d"></i> */}
                        {/* <td data-th="Days">{this.props.date[0]}</td>
                        <td data-th="Weather"><img src={require(`./images/w-${this.props.group[0]}.png`)}/></td>
                        <td data-th="Temp">{Math.round(this.props.temp[0])}&ordm;&nbsp;{this.props.unit === 'metric' ? 'C': 'F'}</td>
                        <td data-th="Desc">{this.props.desc[0]}</td> */}
                    </tr>
                    <tr>
                        <td>Weather</td>
                        {this.props.code.map((m) =><td data-th="Weather"><i className={`owf owf-${m} owf-5x`}></i></td>)}

                        {/* <td data-th="Weather"><img src={require(`./images/w-${this.props.group[1]}.png`)}/></td>
                        <td data-th="Temp">{Math.round(this.props.temp[1])}&ordm;&nbsp;{this.props.unit === 'metric' ? 'C': 'F'}</td>
                        <td data-th="Desc">{this.props.desc[1]}</td> */}
                    </tr>
                    <tr>
                        <td>Temperature</td>
                        {this.props.temp.map( m => <td data-th="Temp">{Math.round(m)}&ordm;&nbsp;{this.props.unit === 'metric' ? 'C': 'F'}</td>)}
                        {/* <td data-th="Days">{this.props.date[2]}</td>
                        <td data-th="Weather"><img src={require(`./images/w-${this.props.group[2]}.png`)}/></td>
                        <td data-th="Temp">{Math.round(this.props.temp[2])}&ordm;&nbsp;{this.props.unit === 'metric' ? 'C': 'F'}</td>
                        <td data-th="Desc">{this.props.desc[2]}</td> */}
                    </tr>
                    <tr>
                        {/* 這個情況我真的覺得太詭異了：
                        我一直沒辦法在我的UI顯示正常的度數標準(C or F)，
                        檢查後發現沒有Fire回去App.js
                        加上了Callback function後還是沒辦法
                        最後檢查了這邊的inline判斷式
                        放了兩個等於才能驗證成功
                        後來不死心，在render()下加上了alert再判斷他們的值
                        回來這邊卻發現他們又能驗證三個等於了
                        我實在覺得太詭異，先在這邊記錄
                        <td>{Math.round(this.props.temp[0])}&ordm;&nbsp;{this.props.unit === 'metric' ? 'C': 'F'}</td> */}
                        {/* <td data-th="Days">{this.props.date[3]}</td>
                        <td data-th="Weather"><img src={require(`./images/w-${this.props.group[3]}.png`)}/></td>
                        <td data-th="Temp">{Math.round(this.props.temp[3])}&ordm;&nbsp;{this.props.unit === 'metric' ? 'C': 'F'}</td> */}
                        <td>Description</td>
                        {this.props.desc.map( m => <td data-th="Desc"> {m}</td>)}
                    </tr>
                    {/* <tr>
                        <td data-th="Days">{this.props.date[4]}</td>
                        <td data-th="Weather"><img src={require(`./images/w-${this.props.group[4]}.png`)}/></td>
                        <td data-th="Temp">{Math.round(this.props.temp[4])}&ordm;&nbsp;{this.props.unit === 'metric' ? 'C': 'F'}</td>
                        <td data-th="Desc">{this.props.desc[4]}</td>
                    </tr> */}
                </table>
            </div>
        </div>
    )}
}