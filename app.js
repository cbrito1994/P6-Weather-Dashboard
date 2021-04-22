const baseURL = "http://api.openweathermap.org/data/2.5/weather";
const forecastURL = "https://api.openweathermap.org/data/2.5/onecall";
const inputForm = document.querySelector('.citySearch__form');
const mainInfo = document.querySelector('.searchDetails__city');
const searchedCities = document.querySelector('.searchedCities');
const forecastInfo = document.querySelector('.forecastInfo');
let searchesData = JSON.parse(localStorage.getItem("searches")) || [];

inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formValue = e.target.childNodes[1].value;
    fetch(`${baseURL}?q=${formValue}&appid=97995bc3fc9cc4a0a94493a6cb9c1d92`).then(response => {
        if(response.ok){
            return response.json();
        } else {
            alert("Enter a valid city please");
        }
    }).then(data => {
        getLatLong(data);
        addedResults(formValue);
    }).catch(error => {
        alert(error)
    });
})

const getLatLong = (data) => {
    let name = data.name;
    fetch(`${forecastURL}?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=97995bc3fc9cc4a0a94493a6cb9c1d92`).then(response => {
        if(response.ok){
            return response.json();
        }
    }).then(data => {
        showMainResults(data, name);
        getForecast(data);
    }).catch(err => {
        alert(err)
    })
}

const showMainResults = (data, name) => {
    let mainInfoText = "";
    let currentDate = moment().format('l');
    let icon = data.current.weather[0].icon;
    let temperature = data.current.temp;
    let wind = data.current.wind_speed;
    let humidity = data.current.humidity;
    let uvindex = data.current.uvi;
    mainInfoText += `
        <h3>${name} (${currentDate}) <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"></h3>
        <p>Temp: ${temperature} F</p>
        <br>
        <p>Wind: ${wind} MPH</p>
        <br>
        <p>Humidity: ${humidity} %</p>
        <br>
        <p>UV Index: <span>${uvindex}</span></p>
    `
    mainInfo.innerHTML = mainInfoText;
}

const getForecast = (data) => {
    forecastInfo.innerHTML = "";
    for(i = 1; i < 6; i++){
        let date = new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US");
        let icon = data.daily[i].weather[0].icon;
        let temperature = data.daily[i].temp.min;
        let wind = data.daily[i].wind_speed;
        let humidity = data.daily[i].humidity;
        let forecast = `
            <div class="forecastInfo__container">
                <h3>${date}</h3>
                <br>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
                <br>
                <p>Temp: ${temperature} F</p>
                <br>
                <p>Wind: ${wind} MPH</p>
                <br>
                <p>Humidity: ${humidity}%</p>
            </div>
        `
        forecastInfo.insertAdjacentHTML('beforeend', forecast)
    }
}

