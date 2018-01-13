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
        this.state = {
            markers: [{
                position: {
                    lat: props.lat,
                    lng: props.lng,
                },
                key: `Taiwan`,
                defaultAnimation: 2,
            }],
        };
    }

    newMarkers(latlong, map){
        var marker = new google.maps.Marker({
            map:map,
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

    componentDidMount() {
        var latlong = new google.maps.LatLng(this.state.markers[0].position.lat, this.state.markers[0].position.lng);
        //XX var markers = []; 應該要放在Global才對

        var options = {
            zoom:12,
            center: latlong
        }

        map = new google.maps.Map(ReactDOM.findDOMNode(this), options);
        this.newMarkers(latlong, map);
        //XX markers.push(marker); 把裝很多markers的array也放在global
        

        // map.addListener('center_changed', function() {
        // // 3 seconds after the center of the map has changed, pan back to the
        // // marker.
        //     window.setTimeout(function() {
        //         map.panTo(marker.getPosition());
        //     }, 3000);
        // });

        map.addListener('click', function(e) {
            this.deleteMarkers();
            // this.setState ({
            //     position: {
            //         lat: e.latLng.lat(),
            //         lng: e.latLng.lng()
            //     }
            // })

            // var markers = new google.maps.Marker({
            //     position: e.latLng,
            //     map: map
            // }); this.state.markers[0].position.lat
            console.log(JSON.stringify(e.latLng));
            this.newMarkers(e.latLng, map);
            this.props.onClick(e.latLng.lat(), e.latLng.lng())
            map.panTo(e.latLng);
          }.bind(this));

        // placeMarkerAndPanTo(latLng, map) {
        //     var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map
        //     });
        //     map.panTo(latLng);
        // };
    }
} 