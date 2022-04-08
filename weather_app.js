const inputForm = document.getElementById("zip-input-form");
const cardContainer = document.getElementById("app-container");
// Yes, exposed API keys are poor practice
const apiKey = "1fd90265a1a504e72f9d580f27492cd4";

// Decode UNIX date provided by OpenWeather API for specified location
function decodeDate (unixDate) {
    const ms = unixDate * 1000;
    const longDate = new Date(ms);
    let dateOptions = {
        day: "numeric",
        weekday: "long",
        year: "numeric",
        month: "long",
    }
    const shortDate = longDate.toLocaleString("en-US", dateOptions);
    return shortDate;
}

function renderWeatherData(data) {
    const newWeatherCard = document.createElement("div");
    const locationDate = decodeDate(data.current.dt);
    // Yes, this looks horrific
    newWeatherCard.innerHTML = `
            <div class="weather-card-container-border">
                <div class="weather-card-container-gradient">
                    <div class="weather-card-container-bg">
                        <div id="location-weather">
                            <div class="location-navbar">
                                <div class="location-heading">
                                        <h2 class="location-name">
                                            ${data.name}
                                        </h2>
                                        <p class="weather-location-date">
                                            ${locationDate}
                                        </p>
                                    </div>
                            </div>
                            <div class="location-body">
                                <div class="location-temperature">
                                    <p class="current-temp">Currently: ${Math.round(data.current.temp)}&#176;F</p>
                                </div>
                                <div class="location-conditions">
                                    <p class="current-condition">
                                        ${data.current.weather[0].main}
                                    </p>
                                    <p class="high-low-temp">
                                        High: ${Math.round(data.daily[0].temp.max)} &#176;F 
                                    </p>
                                    <p class="high-low-temp">
                                        Low: ${Math.round(data.daily[0].temp.min)} &#176;F
                                    </p>
                                </div>
                                <div class="location-forecast">
                                    <div class="todays-forecast">
                                    </div>
                                    <div class="tomorrows-forecast">
                                    </div>
                                    <div class="2-days-forecast">    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    newWeatherCard.setAttribute("class", "weather-card-container");
    cardContainer.appendChild(newWeatherCard);
}

function fetchDataFromLocation(locationInfo) {
    const fullWeatherData = fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${locationInfo.latitude}&lon=${locationInfo.longitude}&units=imperial&exclude=hourly,minutely&appid=${apiKey}`
        )
    .then(response => response.json())
    .catch(error => {
        console.error("Request failed", error);
    })
fullWeatherData.then(data => {
    data.name = locationInfo.name
    console.log(data);
    renderWeatherData(data);
});
}

function fetchWeather(zip) {
    fetch(
        `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`
    )
    .then(response => response.json())
    .then(geoData => {
        const locationInfo = {
            latitude: geoData.lat,
            longitude: geoData.lon,
            name: geoData.name
        }
        return fetchDataFromLocation(locationInfo);
    })
}

// This function executes when the submission form event listener fires
function showWeather(event) {

    // Prevents redirect/refresh of page when submission occurs
    event.preventDefault();

    // Stores user input as zip code
    let inputZipCode = document.getElementById("text-box").value;

    // Checks if input field is empty, and if not, obtains weather data
    // using ZIP code by calling Geocoding and One Call OpenWeather APIs
    if (inputZipCode != "" && inputZipCode.length == 5) {
        fetchWeather(inputZipCode);
    // if input field is empty, alert user        
    } else if (inputZipCode == "") {
        alert("Field cannot be empty.");
    // if input field has fewer than 5 digits, alert user
    } else {
        alert("Please enter 5-digit ZIP code.");
    }
}

// Add event listener to submission form. Allows for use of enter key or clicking
// of submit button on web page
inputForm.addEventListener("submit", showWeather);
