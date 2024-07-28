let SearchForm=document.querySelector(".formtosearchbar");
let inputSearch=document.querySelector(".inputSearch");
let displayState = document.querySelector(".stateName");
let dateoftime = document.querySelector(".time");
let weather_forecast=document.querySelector(".weather-forecast");
let temp=document.querySelector(".temp");
let min_temp=document.querySelector(".min-temp");
let max_temp=document.querySelector(".max-temp");
let icon_weather_forecast=document.querySelector(".icon-weather-forecast");

let feels_Like=document.querySelector("#Feels-Like");
let humidity=document.querySelector("#Humidity");
let wind=document.querySelector("#Wind");
let pressure=document.querySelector("#Pressure");

// this code is used to covert countary short name to complete name
const covertTofullname=(code)=>{
return new Intl.DisplayNames([code],{type:"region"}).of(code)
}

// 
let city="Delhi,India"
SearchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    city=inputSearch.value;
    maindispalyfunc();
    inputSearch.value="";
})

const maindispalyfunc = async () => {
    try {
        const dataFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=53d23cf172bb7c254cd655685dcc8215`);
        const data = await dataFetch.json();
        console.log(data);

        let {main,name,wind,sys,weather,dt}=data
        displayState.innerText=`${name},${covertTofullname(sys.country)}`;

        let currTime=new Date(dt).toLocaleString();
        dateoftime.innerText=currTime;

        weather_forecast.innerText=weather[0].main;

        icon_weather_forecast.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`
        temp.innerHTML=`${main.temp}&#176`;

        min_temp.innerHTML=`Min:${main.temp_min.toFixed()}&#176`;
        max_temp.innerHTML=`Max:${main.temp_max.toFixed()}&#176`;
        feels_Like.innerHTML=`${main.feels_like.toFixed()}&#176`;
        humidity.innerText=`${main.humidity} %`;
        wind.innerText=`${wind.speed} m/s`;
        pressure.innerText=`${main.pressure} hPa`;

    } catch (error) {
        console.log(error);
    }
}

// Attach the event listener to window instead of document.body
window.addEventListener('load', maindispalyfunc);
