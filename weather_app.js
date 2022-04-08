const inputForm = document.getElementById("input-form");

inputForm.addEventListener("submit", addNewListItem);

fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}')
.then(response =>{
    return response.json();
}).then(data =>{
    console.log(data);
})