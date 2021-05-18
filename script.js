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

function displayWeatherCondition(response){
    console.log(response.data);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#condition").innerHTML = response.data.weather[0].main;
    document.querySelector("#high").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector("#low").innerHTML = Math.round(response.data.main.temp_min);
}

function userCitySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city)
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", userCitySearch);

search("New Jersey");