var cityInput = document.querySelector('#cityInput');
var searchButton = document.querySelector('#searchButton');

// api key: 0cf0c8196ec606a9f30889804aba9ea1

requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0cf0c8196ec606a9f30889804aba9ea1';

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