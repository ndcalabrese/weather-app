const inputForm = document.getElementById("zip-input-form");
// Yes, exposed API keys are poor practice
const apiKey = "1fd90265a1a504e72f9d580f27492cd4";

function renderWeatherData(data) {
    const newWeatherCard = document.createElement("div");
    // Yes, this looks horrific
    newWeatherCard.innerHTML(
        <div class="app-container-border">
            <div class="app-container-gradient">
                <div class="app-container-bg">
                    <div id="location-weather">
                        <div class="location-navbar">
                            <div class="location-heading">
                                    <h2 class="location-name">Location 1</h2>
                                    <p class="weather-location-date">Friday, April 8, 2022</p>
                                </div>
                        </div>
                        <div class="location-body">
                            <div class="location-temperature">
                                <p class="current-temp">15 F</p>
                            </div>
                            <div class="location-conditions">
                                <p class="current-condition">
                                    Cloudy
                                </p>
                                <p class="high-low-temp">
                                    45 F / 6 F
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
        </div>`)
}

function fetchWeather(zip) {
    const weatherData = fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`
    )
    .then(response => response.json())
    .then(geoData => {
        const locationInfo = {
            latitude: geoData.lat,
            longitude: geoData.lon,
        }
        return fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${locationInfo.latitude}&lon=${locationInfo.longitude}&exclude={part}&appid=${apiKey}`
        )
    })
    .then(response => response.json())
    .catch(error => {
        console.error("Request failed", error)
    })
    weatherData.then(data => {
        console.log(data);
        renderWeatherData(data);
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
