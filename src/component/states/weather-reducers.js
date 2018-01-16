const initUnitState = 'metric';

export function unit(state = initUnitState, action) {
    switch (action.type) {
        case '@UNIT/SET_UNIT':
            return action.unit;
        default:
            return state;
    }
};

const initWeatherState = {
    city: 'na',
    code: -1,
    group:'na',
    description: 'N/A',
    temp: NaN,
    weatherLoading: false,
    masking: false
};

export function weather(state = initWeatherState, action) {
    switch (action.type) {
        case '@WEATHER/START_GET_WEATHER':
            return {
                ...state,
                city: action.city,
                weatherLoading: true
            }
        
        case '@WEATHER/END_GET_WEATHER':
            return {
                ...state,
                city: action.city,
                code: action.code,
                group: action.group,
                description: action.description,
                temp: action.temp,
                weatherLoading: false
            }
        case '@WEATHER/RESET_WEATHER':
            return {
                ...initWeatherState,
                masking: state.masking
            };
        case '@WEATHER/MASK_TODAY_BG':
            return {
                ...state,
                masking: true
            }
        case '@WEATHER/UNMASK_TODAY_BG':
            return {
                ...state,
                masking: false
            }
        default:
            return state;
    }
};

const initWeatherFormState = {
    inputValue: null,
    unit: null
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

function getInitForecastState() {
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

export function forecast(state = getInitForecastState(), action) {
    switch (action.type) {
        case '@FORECAST/START_GET_FORECAST':
            return {
                ...state,
                city: action.city,
                forecastLoading: true
            };
        case '@FORECAST/END_GET_FORECAST':
            return {
                ...state,
                city: action.city,
                list: action.list,
                forecastLoading: false
            };
        case '@FORECAST/RESET_FORECAST':
            return {
                ...getInitForecastState(),
                masking: state.masking
            };
        case '@FORECAST/MASK_FORECAST_BG':
            return {
                ...state,
                masking: true
            }
        case '@FORECAST/UNMASK_FORECAST_BG':
            return {
                ...state,
                masking: false
            }    
        default:
            return state;
    }
}

import { handleActions, combineActions } from 'redux-actions';

const initLocationState = {
    locationStatus: false,
    lat: NaN,
    lng: NaN
};

export const location = handleActions({
    // [combineActions(GET_LOCATION, GET_LOCATION_STATUS)](state, payload) {
    //     return { ...state, payload}
    // }
    GET_LOCATION: (state, action) => {
        console.log(action);
        
        return {
            ...state, ...action.payload
        }
    },
    GET_LOCATION_STATUS: (state, action) => {return {...state, ...action.payload}}
}, initLocationState);

// const initLocationWeatherTodayState = {
//     city: 'na',
//     lat: NaN,
//     lng: NaN,
//     code: -1,
//     group:'na',
//     description: 'N/A',
//     temp: NaN,
//     // weatherLoading: false,
//     masking: false
// }

// export const locationWeather = handleActions ({
//     GET_LOCATION_WEATHER_STATUS: (state, action) => {
//         return {
//             ...state,
//             masking: true,
//         }
//     },
//     GET_LOCATION_WEATHER: (state, action) => {
//         return {
//             ...state,
//             masking: false,

//         }
//     }
// }, initLocationState)