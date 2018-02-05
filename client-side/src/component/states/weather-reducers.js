const initUnitState = 'metric';

export function unit(state = initUnitState, action) {
    switch (action.type) {
        case '@UNIT/SET_UNIT':
            return action.unit;
        default:
            return state;
    }
};

const initWeatherFormState = {
    inputValue: '',
    unit: ''
}

export function weatherForm(state = initWeatherFormState, action) {
    switch (action.type) {
        case '@WEATHER_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value,
            }
        case '@WEATHER_FORM/SELECT_UNIT':
            return {
                ...state,
                unit: action.unit
            }
    
        default:
            return state;
    }
}

// is it best pratice to export to weather-actions?
export function getInitForecastState() {
    let list = [];
    for (let i = 0; i < list.length; i++) {
        list[i] = {
            ts: -1,
            code: -1,
            group: 'na',
            description: 'N/A',
            temp: NaN,
            data: -1
        };
    }
    return {
        city: 'na',
        list,
        forecastLoading: false,
        masking: false
    };
}

// export function forecast(state = getInitForecastState(), action) {
//     switch (action.type) {
//         case '@FORECAST/START_GET_FORECAST':
//             return {
//                 ...state,
//                 city: action.city,
//                 forecastLoading: true
//             };
//         case '@FORECAST/END_GET_FORECAST':
//             return {
//                 ...state,
//                 city: action.city,
//                 list: action.list,
//                 forecastLoading: false
//             };
//         case '@FORECAST/RESET_FORECAST':
//             return {
//                 ...getInitForecastState(),
//                 masking: state.masking
//             };
//         case '@FORECAST/MASK_FORECAST_BG':
//             return {
//                 ...state,
//                 masking: true
//             }
//         case '@FORECAST/UNMASK_FORECAST_BG':
//             return {
//                 ...state,
//                 masking: false
//             }    
//         default:
//             return state;
//     }
// }

import { handleActions, combineActions } from 'redux-actions';

const initLocationState = {
    requestStatus: false,
    lat: 25.105497,
    lng: 121.597366
};


export const location = handleActions({
    [combineActions('START_GET_USER_LOCATION', 'END_GET_USER_LOCATION', 'SET_LOCATION_INPUT_LAT_LNG')](state, action) {
        return { ...state, ...action.payload}
    }
}, initLocationState);

const initWeatherState = {
    city: 'na',
    code: -1,
    group:'na',
    description: 'N/A',
    temp: NaN,
    weatherLoading: false,
    masking: false,
};

export const weather = handleActions ({
    [combineActions('START_GET_WEATHER_LOCATION', 'END_GET_WEATHER_LOCATION', 'START_GET_WEATHER', 'END_GET_WEATHER', 'RESET_WEATHER', 'MASK_TODAY_BG', 'UNMASK_TODAY_BG')](state, action) {
        // console.log(`action.payload:`,action.payload);
        return { ...state, ...action.payload }
    }
}, initWeatherState)

export const forecast = handleActions({
    [combineActions('START_GET_FORECAST_LOCATION', 'END_GET_FORECAST_LOCATION', 'START_GET_FORECAST', 'END_GET_FORECAST', 'RESET_FORECAST', 'MASK_FORECAST_BG', 'UNMASK_FORECAST_BG')](state, action) {
        return { ...state, ...action.payload }
    }
}, getInitForecastState());