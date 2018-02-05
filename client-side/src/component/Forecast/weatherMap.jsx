/*global google*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

var markers = [];
var map;

import 'Forecast/weatherMap.css'

export default class WeatherMap extends Component {

    render(){

        return(
            <div id="map" className={`mapComponent${this.props.masking ? '-masking' : ''}`}><span></span></div>
        )
    }

    constructor(props) {
        super(props);
    }

    newMarkers(latlong, map){
        var marker = new google.maps.Marker({
            map:this.map,
            defaultAnimation: 2,
            position: latlong
        });
        markers.push(marker);
    }

    deleteMarkers() {
        this.clearMarkers();
        markers = [];
        // console.log(markers);
    }

    clearMarkers() {
        this.setMapOnAll(null);
    }

    setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }    

    componentWillReceiveProps(nextProps) {
        const {lat, lng} = this.props
        const map = this.map
        if (nextProps.lat !== lat && nextProps.lng !== lng) {
            const newLatlng = {lat: nextProps.lat, lng: nextProps.lng};

            const options = {
                zoom:12,
                center: newLatlng
            }

            // init another new google.maps will override the original maps
            // X const map = new google.maps.Map(ReactDOM.findDOMNode(this), options);

            this.deleteMarkers();
            this.newMarkers(newLatlng, map);
            map.panTo(newLatlng);
        }
    }

    componentDidMount() {
        const {lat, lng} = this.props;
        
        var latlong = new google.maps.LatLng(lat, lng);
        
        //XX var markers = []; 應該要放在Global才對

        var options = {
            zoom:12,
            center: latlong
        }

        this.map = new google.maps.Map(ReactDOM.findDOMNode(this), options);
        this.newMarkers(latlong, this.map);
        
        //XX markers.push(marker); 把裝很多markers的array也放在global

        this.map.addListener('click', function(e) {
            this.deleteMarkers();
            this.newMarkers(e.latLng, map);
            this.props.onClick(e.latLng.lat(), e.latLng.lng())
            this.map.panTo(e.latLng);
          }.bind(this));
    }
} 