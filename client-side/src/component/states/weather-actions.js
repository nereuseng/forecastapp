import {
    getWeather as getWeatherFromApi,
    getForecast as getForecastFromApi,
} from 'Api/openWeatherMapApi.js';
import { getUserLocation as getUserLocationFromApi } from 'component/userLocation.jsx';
import { getLocationWeatherToday as getLocationWeatherTodayFromApi } from 'Api/openWeatherMapApi.js';
import { getLocationWeather as getLocationWeatherFromApi } from 'Api/openWeatherMapApi.js';

import { createAction, createActions } from 'redux-actions';
import {getInitForecastState} from 'states/weather-reducers.js'


/* Unit */

function setUnit(unit) {
    return {
        type: '@UNIT/SET_UNIT',
        unit: unit
    }
}

/* Today */

const {
    startGetWeather,
    endGetWeather,
    resetWeather,
    maskTodayBg,
    unmaskTodayBg,
    startGetUserLocation,
    endGetUserLocation,
    getWeatherLocation,
} = createActions(
    'START_GET_WEATHER',
    'END_GET_WEATHER',
    'RESET_WEATHER',
    'MASK_TODAY_BG',
    'UNMASK_TODAY_BG',
    'START_GET_USER_LOCATION',
    'END_GET_USER_LOCATION',
    'GET_WEATHER_LOCATION'
)

export function getWeather(city, unit) {
    return (dispatch, getState) => {
        dispatch(startGetWeather({city, unit}));
        dispatch(maskTodayBg({masking: true}));

        return getWeatherFromApi(city, unit).then(weather =>{
            console.log(weather);
            const {city, code, group , description, temp, unit} = weather;
            dispatch(endGetWeather({city, code, group, description, temp}));
            dispatch(setUnit(unit));
        }).then( () => {
            setTimeout(() => {
                dispatch(unmaskTodayBg({masking: false}));
            }, 600);
        }).catch(err => {
            console.error('Error getting weather', err);
            dispatch(resetWeather());
            setTimeout(() => {
                dispatch(unmaskTodayBg({masking: false}));
            }, 600);
        });
    };
};

/**
 * location
 */

export const getLocationWeatherToday = function(unit){
    return async (dispatch, getState) => {
        dispatch(startGetUserLocation({requestStatus: true}));
        dispatch(maskTodayBg({masking: true}));

        try {
            const res = await getUserLocationFromApi();
            const {latitude: lat, longitude: lng} = res.coords;
            console.log(lat, lng);
            dispatch(endGetUserLocation({lat, lng, requestStatus: false}));

            const weather = await getLocationWeatherTodayFromApi(lat, lng, unit);
            console.log(weather);
            const {city, code, group , description, temp} = weather;
            dispatch(getWeatherLocation({city, code, group , description, temp}));

            // dispatch(endGetUserLocation({requestStatus: false}));
            setTimeout(() => {
                dispatch(unmaskTodayBg({masking: false}));
            }, 600);
        } catch (err) {
            console.log('Error getting User Location', err);
            setTimeout(() => {
                dispatch(unmaskTodayBg({masking: false}));
            }, 600);
            // some reset action?
        }
    }
}



/* WeatherForm */

export function input(value) {
    return {
        type: '@WEATHER_FORM/INPUT',
        value: value
    };
}

export function selectUnit(unit) {
    return {
        type: '@WEATHER_FORM/SELECT_UNIT',
        unit: unit
    };
}

/* Forecast */

const {
    startGetForecast,
    endGetForecast,
    maskForecastBg,
    unmaskForecastBg,
    resetForecast,
    startGetLocationWeather,
    
} = createActions(
    'START_GET_FORECAST',
    'END_GET_FORECAST',
    'MASK_FORECAST_BG',
    'UNMASK_FORECAST_BG',
    'RESET_FORECAST',
    'START_GET_LOCATION_WEATHER',
    
);
// 不能超過六個actions?
const endGetLocationForecast = createAction('END_GET_LOCATION_WEATHER');

export function getForecast(city, unit) {
    return (dispatch, getState) => {
        dispatch(startGetForecast({city, unit}));
        dispatch(maskForecastBg({masking: true}));
        
        return getForecastFromApi(city, unit).then(forecast => {
            const {city, list, unit} = forecast;
            dispatch(endGetForecast({city, list}));
            dispatch(setUnit(unit));
        }).then( () => {
            setTimeout(() => {
            dispatch(unmaskForecastBg({masking: false}));
        }, 600);
        }).catch(err => {
            console.error('Error getting forecast', err);
            dispatch(resetForecast({...getInitForecastState()}));
            setTimeout(() => {
                dispatch(unmaskForecastBg({masking: false}));
            }, 600);
        })
    }
}

export function getLocationWeather(lat, lng, unit) {
    return async (dispatch, getState) => {
        dispatch(startGetLocationWeather({lat, lng, unit}));

        try {
            const locationForecast = await getLocationWeatherFromApi(lat, lng, unit);
            
            const {city, list } = locationForecast;
            dispatch(endGetLocationForecast({city, list, lat, lng}));
            dispatch(setUnit(unit));

        } catch (err) {
            console.log('Error getting forecast', err);
            dispatch(resetForecast({...getInitForecastState()}));
            setTimeout(() => {
                dispatch(unmaskForecastBg({masking: false}));
            }, 600);
        }
    }
}

export const getUserLocation = function(unit){
    return async (dispatch, getState) => {
        dispatch(startGetUserLocation({requestStatus: true}));
        dispatch(maskForecastBg({masking: true}));

        try {
            const res = await getUserLocationFromApi();
            const {latitude: lat, longitude: lng} = res.coords;
            dispatch(endGetUserLocation({lat, lng, requestStatus: false}));
            
            dispatch(getLocationWeather(lat, lng, unit));
            setTimeout(() => {
                dispatch(unmaskForecastBg({masking: false}));
            }, 600);

            // dispatch(endGetUserLocation({requestStatus: false}));
        } catch (err) {
            console.log('Error getting User Location', err);
            dispatch(resetForecast({...getInitForecastState()}));
            setTimeout(() => {
                dispatch(unmaskForecastBg({masking: false}));
            }, 600);
        }
    }
}

// function startGetForecast(city, unit) {
//     return {
//         type: '@FORECAST/START_GET_FORECAST',
//         city,
//         unit
//     };
// }

// function endGetForecast(city, list) {
//     return {
//         type: '@FORECAST/END_GET_FORECAST',
//         city,
//         list
//     };
// }

// function resetForecast() {
//     return {
//         type: '@FORECAST/RESET_FORECAST',
//     };
// }

// function maskForecastBg() {
//     return {
//         type: '@FORECAST/MASK_FORECAST_BG'
//     };
// }

// function unmaskForecastBg() {
//     return {
//         type: '@FORECAST/UNMASK_FORECAST_BG'
//     };
// }