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

