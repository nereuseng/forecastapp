import axios from 'axios';

const key = `2da0473a0c7713adcff021bde8e391e3`;


export function getWeather(city, unit) {
    var url = `https://api.openweathermap.org/data/2.5/weather?appid=${key}&q=${city}&units=${unit}`;

    console.log(`Making request to ${url}`);

    //這是增強版的XHR，叫做Axios，出來的respond是json檔，再命名成res直接像下面那樣抓
    //請參考這個https://api.openweathermap.org/data/2.5/weather?appid=2da0473a0c7713adcff021bde8e391e3&q=london&units=metric
    return axios.get(url).then(function (res) {
        if (res.data.cod && res.data.message){
            throw new Error(res.data.message)
        } else {
            return {
                city: capitalized(city),
                code: res.data.weather[0].id,
                // Today的背景還是需要group
                group: getWeatherGroup(res.data.weather[0].id),
                description: capitalized(res.data.weather[0].description),
                temp: res.data.main.temp,
                unit: unit,
            };
            
        }
    })
}

function capitalized(string) {
    return string.charAt(0).toUpperCase()+string.substring(1).toLowerCase();
}

function weekDay(string) {
   let dateArrray = string.split("-");
   let year = dateArrray[0];
   let month = dateArrray[1];
   let day = dateArrray[2];
   let combined = year + "/" + month + "/" + day;
   let date = new Date(combined);
   let dayRaw = date.getDay();

   let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   return weekDay[dayRaw];
}

export function getWeatherGroup(code) {
    let group = 'na';
    if (200 <= code && code < 300) {
        group = 'thunderstorm';
    } else if ( 300 <= code && code < 400) {
        group = 'drizzle';
    } else if ( 500<= code && code < 600) {
        group = 'rain';
    } else if ( 600<= code && code < 700) {
        group = 'snow';
    } else if ( 700<= code && code < 800) {
        group = 'atmosphere';
    } else if ( 800 === code) {
        group = 'clear';
    } else if ( 801 <= code && code < 900 ) {
        group = 'clouds';
    }
    return group;
}

export function getForecast(city, unit) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${key}`

    console.log(`Making request to ${url}`);

    return axios.get(url).then(function (res) {
        if (res.data.cod && res.data.cod!=200 && res.data.message){
            throw new Error(res.data.message);
        }
        const regex = /\s+12/;
        const rawList = res.data.list.filter(rawForecast => {
            return rawForecast.dt_txt.match(regex)
        })
        const list = rawList.map(forecast => {
            return {
                code: forecast.weather[0].id,
                group: getWeatherGroup(forecast.weather[0].id),
                description: forecast.weather[0].description,
                temp: forecast.main.temp,
                date: weekDay(forecast.dt_txt)
            };
        });
        return {
            city: capitalized(city),
            unit: unit,
            list
        };
    })
}

export function getLocationWeatherToday(lat, lng , unit) {
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}&units=${unit}`
    console.log(`Making request to ${url}`);

    return axios.get(url).then(function(res){
        if (res.data.cod && res.data.cod!=200 && res.data.message){
            throw new Error(res.data.message);
        }            
        return {
            unit:unit,
            lat: lat,
            lng: lng,
            city: res.data.name,
            code: res.data.weather[0].id,
            group: getWeatherGroup(res.data.weather[0].id),
            description: capitalized(res.data.weather[0].description),
            temp: res.data.main.temp,
        }
    })
}


export function getLocationWeather(lat, lng , unit) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${key}&units=${unit}`
    console.log(`Making request to ${url}`);

    return axios.get(url).then(function (res) {
        if (res.data.cod && res.data.cod!=200 && res.data.message){
            throw new Error(res.data.message);
        }
        const regex = /\s+12/;
        const rawList = res.data.list.filter(rawForecast => {
            return rawForecast.dt_txt.match(regex)
        })
        const list = rawList.map(forecast => {
            return {
                code: forecast.weather[0].id,
                group: getWeatherGroup(forecast.weather[0].id),
                description: forecast.weather[0].description,
                temp: forecast.main.temp,
                date: weekDay(forecast.dt_txt)
            };
        });
        return {
            lat: lat,
            lng: lng,
            city: capitalized(res.data.city.name),
            unit: unit,
            list
        };
    })
}

// https://api.openweathermap.org/data/2.5/forecast?lat=25.0112183&lon=121.52067570000001&appid=2da0473a0c7713adcff021bde8e391e3&units=metric