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
  let minutes = date.getMinutes();
  let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${day} ${month} ${fecha}, ${hours}:${minutes}, ${year}`;

}

function displayWeatherCondition(response){
    console.log(response.data);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#condition").innerHTML = response.data.weather[0].description;
    document.querySelector("#high").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector("#low").innerHTML = Math.round(response.data.main.temp_min);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000)
  }

function userCitySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city)
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", userCitySearch);

search("New York");

function convertToCelcius(event){
    event.preventDefault();
    let tempElement = document.querySelector("#temp");
    let temp = tempElement.innerHTML;
    tempElement.innerHTML = Math.round((temp - 32) * 5/9);
    let highElementC = document.querySelector("#high");
    let highC = highElementC.innerHTML;
    highElementC.innerHTML = Math.round((highC - 32) * 5/9);
    let lowElementC = document.querySelector("#low");
    let lowC = lowElementC.innerHTML;
    lowElementC.innerHTML = Math.round((lowC - 32) * 5/9);
}
let celcius = document.querySelector ("#c-link");
celcius.addEventListener("click", convertToCelcius)

function convertToFahrenheit(event){
    event.preventDefault();
    let tempElement = document.querySelector("#temp");
    let temp = tempElement.innerHTML;
    tempElement.innerHTML = Math.round((temp * 9) / 5 + 32); 
    let highElementF = document.querySelector("#high");
    let highF = highElementF.innerHTML;
    highElementF.innerHTML = Math.round((highF * 9) / 5 + 32);
    let lowElementF = document.querySelector("#low");
    let lowF = lowElementF.innerHTML;
    lowElementF.innerHTML = Math.round((lowF * 9) / 5 + 32);
}
let fahrenheit = document.querySelector ("#f-link");
fahrenheit.addEventListener("click", convertToFahrenheit)
