const inputForm = document.getElementById("zip-input-form");
const apiKey = "1fd90265a1a504e72f9d580f27492cd4";

function getZipCode(zipCode) {
    fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`
    )
    .then(response => {
        return response.json();
    })
    .then(locationData => {
        const locationCoords = {
            lat: locationData.lat,
            lon: locationData.lon
        }
        return locationCoords;
    });
}

function getWeatherData(zipCode) {
    getZipCode(zipCode);
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`
    )
    .then(response =>{
        return response.json();
    })
    .then(weatherAtLocation => {
        return weatherAtLocation;
    })
}

function updateWeather(zipCode) {
    getWeatherData(zipCode)
    
}


// This function is executed when the submission form event listener fires
// It stores the user input as a zip code and calls the updateWeather function
function updateWeather(event) {
    event.preventDefault();
    let inputZipCode = document.getElementById("text-box").value;
    if (inputZipCode != "") {
        updateWeather(inputZipCode);
    } else {
        alert("Field cannot be empty.")
    }
}

// Add event listener to submission form. Allows for use of enter key or clicking
// of submit button on web page
inputForm.addEventListener("submit", updateWeather);
