import React, { Component } from 'react';
import 'Forecast/WeatherTable.css';
import 'owfont/css/owfont-regular.css'

export default class WeatherTable extends Component {
    render() {
        return(
        <div className={`forecast-display${this.props.masking ? '-masking' : ''}`}>
            <div className={`weather-table${this.props.masking ? '-masking' : ''}`}>
                <h1>Forcast for {this.props.city} in 5 days: </h1>
                <table className="table-rwd">
                    <tbody>
                    <tr>
                        <td className="td-only-hide">Days</td>
                        {this.props.date.map((m, index) => <td data-th="Days" key={index}>{m}</td>)}
                        {/* map的函數要加上index的參數， td裡面加上key*/}
                    </tr>
                    <tr>
                        <td className="td-only-hide">Weather</td>
                        {this.props.code.map((m, index) =><td data-th="Weather" key={index}><i className={`owf owf-${m} owf-5x`}></i></td>)}
                    </tr>
                    <tr>
                        <td className="td-only-hide">Temperature</td>
                        {this.props.temp.map((m, index) => <td data-th="Temp" key={index}>{Math.round(m)}&ordm;&nbsp;{this.props.unit === 'metric' ? 'C': 'F'}</td>)}
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
                        <td className="td-only-hide">Description</td>
                        {this.props.desc.map((m, index) => <td data-th="Desc" key={index}> {m}</td>)}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )}
}