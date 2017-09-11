import axios from 'axios';

const key = `2da0473a0c7713adcff021bde8e391e3`;


export function getWeather(city, unit) {
    var url = `http://api.openweathermap.org/data/2.5/weather?appid=${key}&q=${city}&units=${unit}`;

    console.log(`Making request to ${url}`);

    return axios.get(url).then(function (res) {
        // alert(res.data.weather[0].description); testing propose
        if (res.data.cod && res.data.message){
            throw new Error(res.data.message)
        } else {
            return {
                city: capitalized(city),
                code: res.data.weather[0].id,
                group: getWeatherGroup(res.data.weather[0].id),
                desc: capitalized(res.data.weather[0].description),
                temp: res.data.main.temp,
                unit: unit
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

   let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
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
    } else if ( 801 <= code && code <= 805 ) {
        group = 'clouds';
    }
    return group;
}

export function getForecast(city, unit) {
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${key}`

    console.log(`Making request to ${url}`);

    return axios.get(url).then(function (res) {
        if (res.data.cod && res.data.cod!=200 && res.data.message){
            throw new Error(res.data.message)
        } else {
            return {
                city: capitalized(city),
                code: [res.data.list[0].weather[0].id, res.data.list[7].weather[0].id, res.data.list[15].weather[0].id, res.data.list[23].weather[0].id, res.data.list[31].weather[0].id],
                group: [getWeatherGroup(res.data.list[0].weather[0].id), getWeatherGroup(res.data.list[7].weather[0].id), getWeatherGroup(res.data.list[15].weather[0].id), getWeatherGroup(res.data.list[23].weather[0].id), getWeatherGroup(res.data.list[31].weather[0].id)],
                desc: [res.data.list[0].weather[0].description, res.data.list[7].weather[0].description, res.data.list[15].weather[0].description, res.data.list[23].weather[0].description, res.data.list[31].weather[0].description],
                temp: [res.data.list[0].main.temp, res.data.list[7].main.temp, res.data.list[15].main.temp, res.data.list[23].main.temp, res.data.list[31].main.temp],
                date: [weekDay(res.data.list[0].dt_txt), weekDay(res.data.list[7].dt_txt), weekDay(res.data.list[15].dt_txt), weekDay(res.data.list[23].dt_txt), weekDay(res.data.list[31].dt_txt)]
            };
        }
    })
}