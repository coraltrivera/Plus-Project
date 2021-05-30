let now = new Date();
let h1 = document.querySelector("h1");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
  }
let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];
h1.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;


function search(city){  
    let apiKey = "cd5e89045eaf1b6a2be7acb80a47437f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeatherCondition)

}

function formatDate(timestamp){
  let date = new Date(timestamp);
  let fecha = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return ` Last Updated ${day} ${month} ${fecha}, ${hours}:${minutes}, ${year}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp *1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wedsnesday", "Thursday", "Friday", "Saturday"];
  return days[day];
}

function getForecast(coordinates){
  let apiKey = "cd5e89045eaf1b6a2be7acb80a47437f";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

function displayWeatherCondition(response){
    console.log(response.data)
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#condition").innerHTML = response.data.weather[0].description;
    document.querySelector("#high").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector("#low").innerHTML = Math.round(response.data.main.temp_min);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000)
    getForecast(response.data.coord);
  }

function userCitySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city)
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6){
    forecastHTML = forecastHTML + `
        <div class="col-2">
          ${formatDay(forecastDay.dt)} <br>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/> <br>
          <span id="forecast-max">${Math.round(forecastDay.temp.max)}°</span> <span id="forecast-min">${Math.round(forecastDay.temp.min)}°</span>
        </div>`; 
    } 
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
 
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", userCitySearch);

search("New York");


