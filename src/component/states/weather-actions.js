import {
    getWeather as getWeatherFromApi,
    getForecast as getForecastFromApi,
} from 'Api/openWeatherMapApi.js';
import { createAction } from 'redux-actions';


/* Unit */

function setUnit(unit) {
    return {
        type: '@UNIT/SET_UNIT',
        unit: unit
    }
}

 /* Today */

const startGetWeather = createAction('START_GET_WEATHER');
const endGetWeather = createAction('END_GET_WEATHER');
const resetWeather = createAction('RESET_WEATHER');
const maskTodayBg = createAction('MASK_TODAY_BG');
const unmaskTodayBg = createAction('UNMASK_TODAY_BG');

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

// function startGetweather(city, unit) {
//     return {
//         type: '@WEATHER/START_GET_WEATHER',
//         city,
//         unit
//     };
// }

// function endGetWeather(city, code, group, description, temp) {
//     return {
//         type: '@WEATHER/END_GET_WEATHER',
//         city,
//         code,
//         group,
//         description,
//         temp,
//     };
// }

// function resetWeather() {
//     return {
//         type: '@WEATHER/RESET_WEATHER'
//     }
// }

// function maskTodayBg() {
//     return{
//         type: '@WEATHER/MASK_TODAY_BG'
//     };
// }

// function unmaskTodayBg() {
//     return {
//         type: '@WEATHER/UNMASK_TODAY_BG'
//     };
// }

/* WeatherForm */

// export function toggleForm() {
//     return {
//         type: '@WEATHER_FORM/TOOGLE_FORM',
//     };
// }

export function input(value) {
    return {
        type: '@WEATHER_FORM/INPUT',
        value: value
    };
}

// export function toggleTemp() {
//     return {
//         type: '@WEATHER_FORM/TOGGLE_TEMP'
//     };
// }

export function selectUnit(unit) {
    return {
        type: '@WEATHER_FORM/SELECT_UNIT',
        unit: unit
    };
}

/* Forecast */

function startGetForecast(city, unit) {
    return {
        type: '@FORECAST/START_GET_FORECAST',
        city,
        unit
    };
}

function endGetForecast(city, list) {
    return {
        type: '@FORECAST/END_GET_FORECAST',
        city,
        list
    };
}

function resetForecast() {
    return {
        type: '@FORECAST/RESET_FORECAST',
    };
}

function maskForecastBg() {
    return {
        type: '@FORECAST/MASK_FORECAST_BG'
    };
}

function unmaskForecastBg() {
    return {
        type: '@FORECAST/UNMASK_FORECAST_BG'
    };
}

export function getForecast(city, unit) {
    return (dispatch, getState) => {
        dispatch(startGetForecast(city, unit));
        dispatch(maskForecastBg());
        
        return getForecastFromApi(city, unit).then(forecast => {
            const {city, list, unit} = forecast;
            dispatch(endGetForecast(city, list));
            dispatch(setUnit(unit));
        }).then( () => {
            setTimeout(() => {
            dispatch(unmaskForecastBg());
        }, 600);
        }).catch(err => {
            console.error('Error getting forecast', err);
            dispatch(resetForecast());
        })
    }
}

/**
 * location
 */
import { getUserLocation as getUserLocationFromApi } from 'component/userLocation.jsx';
import { getLocationWeatherToday as getLocationWeatherTodayFromApi } from 'Api/openWeatherMapApi.js';

 const getUserLocation = createAction('GET_LOCATION');
 const startGetUserLocation = createAction('START_GET_USER_LOCATION');
 const endGetUserLocation = createAction('END_GET_USER_LOCATION');
 const getWeatherLocation = createAction('GET_LOCATION_WEATHER');
 const getWeatherLocationStatus = createAction('GET_LOCATION_WEATHER_STATUS');

 export const getLocationWeather = function(unit){
    return async (dispatch, getState) => {
        dispatch(startGetUserLocation({requestStatus: true}));
        dispatch(maskTodayBg({masking: true}));

        try {
            const res = await getUserLocationFromApi();
            const {latitude: lat, longitude: lng} = res.coords;
            console.log(lat, lng);
            dispatch(getUserLocation({lat, lng}));

            const weather = await getLocationWeatherTodayFromApi(lat, lng, unit);
            console.log(weather);
            const {city, code, group , description, temp} = weather;
            dispatch(getWeatherLocation({city, code, group , description, temp}));
            
            dispatch(endGetUserLocation({requestStatus: false}));
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