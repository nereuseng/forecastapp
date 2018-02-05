import {
    getWeather as getWeatherFromApi,
    getForecast as getForecastFromApi,
} from 'Api/openWeatherMapApi.js';
import { getUserLocation as getUserLocationFromApi } from 'component/userLocation.jsx';
import { getLocationWeatherToday as getLocationWeatherTodayFromApi } from 'Api/openWeatherMapApi.js';
import { getLocationForecast as getLocationForecastFromApi } from 'Api/openWeatherMapApi.js';

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
    startGetWeatherLocation,
    endGetWeatherLocation,
} = createActions(
    'START_GET_WEATHER',
    'END_GET_WEATHER',
    'RESET_WEATHER',
    'MASK_TODAY_BG',
    'UNMASK_TODAY_BG',
    'START_GET_WEATHER_LOCATION',
    'END_GET_WEATHER_LOCATION'
)

export function getWeather(city, unit) {
    return (dispatch, getState) => {
        dispatch(startGetWeather({city, unit}));
        dispatch(maskTodayBg({masking: true}));

        return getWeatherFromApi(city, unit).then(weather =>{
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

const {
    startGetUserLocation,
    endGetUserLocation,
    setLocationInputLatLng,
} = createActions(
    'START_GET_USER_LOCATION',
    'END_GET_USER_LOCATION',
    'SET_LOCATION_INPUT_LAT_LNG',
)

// SET_LOCATION_INPUT_LATLNG ==>> with cause redux-actions not recognized redux function

// Combine location and weather request.
export const getUserLocation = function () {
    return async (dispatch, getState) => {
        dispatch(startGetUserLocation({requestStatus: true}));
        try {
            const res = await getUserLocationFromApi();
            const {latitude: lat, longitude: lng} = res.coords;
            dispatch(endGetUserLocation({lat, lng, requestStatus: false}));
        } catch (err) {
            console.log(`Error getting User Location`);
        }
    }
}

export const getLocationWeatherToday = function(lat, lng, unit){
    return async (dispatch, getState) => {
        dispatch(startGetWeatherLocation({weatherLoading: true}));
        dispatch(maskTodayBg({masking: true}));

        try {
            const weather = await getLocationWeatherTodayFromApi(lat, lng, unit);
            const {city, code, group , description, temp} = weather;
            dispatch(endGetWeatherLocation({city, code, group , description, temp, weatherLoading: false}));
            
            dispatch(setUnit(unit))

            setTimeout(() => {
                dispatch(unmaskTodayBg({masking: false}));
            }, 600);
        } catch (err) {
            console.log('Error getting User Location', err);
            dispatch(resetWeather());
            setTimeout(() => {
                dispatch(unmaskTodayBg({masking: false}));
            }, 600);
        }
    }
}

export const getLocationForecast = function (lat, lng, unit) {
    return async (dispatch, getState) => {
        dispatch(startGetForecastLocation({forecastLoading: true}));

        try {
            console.log(lat, lng);
            
            const forecastLoation = await getLocationForecastFromApi(lat, lng, unit)
            console.log(forecastLoation);
            const {city, list} = forecastLoation;
            dispatch(endGetForecastLocation({city, list, forecastLoading: false}));

            dispatch(setUnit(unit));
        } catch (err) {
            console.log('Error getting Forecast', err);
            dispatch(resetForecast({...getInitForecastState()}));
            setTimeout(() => {
                dispatch(unmaskForecastBg({masking: false}));
            }, 600);
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
    resetForecast,
    startGetForecastLocation,
    endGetForecastLocation,
} = createActions(
    'START_GET_FORECAST',
    'END_GET_FORECAST',
    'RESET_FORECAST',
    'START_GET_FORECAST_LOCATION',
    'END_GET_FORECAST_LOCATION'
);

// Export to Forecast component to dispatch action.
export const {
    maskForecastBg,
    unmaskForecastBg,
} = createActions(
    'MASK_FORECAST_BG',
    'UNMASK_FORECAST_BG',
)


export function getForecast(city, unit) {
    return (dispatch, getState) => {
        dispatch(startGetForecast({city, unit}));
        dispatch(maskForecastBg({masking: true}));
        
        return getForecastFromApi(city, unit).then(forecast => {
            const {city, list, unit, lat, lng} = forecast;
            dispatch(endGetForecast({city, list}));
            dispatch(setLocationInputLatLng({lat, lng}));
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

// export function getLocationWeather(lat, lng, unit) {
//     return async (dispatch, getState) => {
//         dispatch(startGetLocationWeather({lat, lng, unit}));

//         try {
//             const locationForecast = await getLocationWeatherFromApi(lat, lng, unit);
            
//             const {city, list } = locationForecast;
//             dispatch(endGetLocationForecast({city, list, lat, lng}));
//             dispatch(setUnit(unit));

//         } catch (err) {
//             console.log('Error getting forecast', err);
//             dispatch(resetForecast({...getInitForecastState()}));
//             setTimeout(() => {
//                 dispatch(unmaskForecastBg({masking: false}));
//             }, 600);
//         }
//     }
// }

// export const getUserLocation = function(unit){
//     return async (dispatch, getState) => {
//         dispatch(startGetUserLocation({requestStatus: true}));
//         dispatch(maskForecastBg({masking: true}));

//         try {
//             const res = await getUserLocationFromApi();
//             const {latitude: lat, longitude: lng} = res.coords;
//             dispatch(endGetUserLocation({lat, lng, requestStatus: false}));
            
//             dispatch(getLocationWeather(lat, lng, unit));
//             setTimeout(() => {
//                 dispatch(unmaskForecastBg({masking: false}));
//             }, 600);

//             // dispatch(endGetUserLocation({requestStatus: false}));
//         } catch (err) {
//             console.log('Error getting User Location', err);
//             dispatch(resetForecast({...getInitForecastState()}));
//             setTimeout(() => {
//                 dispatch(unmaskForecastBg({masking: false}));
//             }, 600);
//         }
//     }
// }

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