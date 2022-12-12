var cityInput = document.querySelector('#cityInput');
var searchButton = document.querySelector('#searchButton');

requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

fetch(requestUrl)
    .then(function (response){
        return response.text();
    })
    .then(function (data){
        console.log(data);
    })
    .catch(function (error){
        console.log(error);
    });