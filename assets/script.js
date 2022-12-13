var cityInput = document.querySelector('#cityInput');
var searchButton = document.querySelector('#searchButton');
var resultsEl = document.querySelector('#results');

function displayData (results){
    for (var result of results){
        console.log(results);

        var cardEl = document.createElement('div');
        cardEl.className = 'card';
        
        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        
        var cardTitleEl = document.createElement('h5');
        cardTitleEl.className = 'card-title';
        cardTitleEl.textContent = results.city.name;
        
        var cardTextEl = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = results.list[0].main.temp, results.list[0].main.humidity, results.list[0].wind.speed; 

    };
};









// geocodeUrl gives back data on lat and lon
function getCoordinates (cityName){
    var geocodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=0cf0c8196ec606a9f30889804aba9ea1';

    
    fetch(geocodeUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data[0].lat, data[0].lon);
            getWeather(data[0].lat, data[0].lon);
        })
        .catch(function (error){
            console.log(error);
        });
};

// transfer coordinates data into getWeather
function getWeather (lat, lon){
    latUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon +'&appid=0cf0c8196ec606a9f30889804aba9ea1' + '&units=imperial';
    
    fetch(latUrl)
    .then(function(response){
        return response.json();
    })
    .then(function (data){
        // console.log(data.city.name);
        // console.log(data.list[0].dt_txt);
        // console.log(data.list[0].weather[0].icon);
        // console.log(data.list[0].main.temp);
        // console.log(data.list[0].main.humidity);
        // console.log(data.list[0].wind.speed);
        console.log(weatherResults);
        var weatherResults = [
            data.city.name, 
            data.list[0].dt_txt,
            data.list[0].weather[0].icon,
            data.list[0].main.temp,
            data.list[0].main.humidity,
            data.list[0].wind.speed,
        ];
        displayData(weatherResults);
    })
    .catch(function (error){
        console.log(error);
    })
    
}; 
//city name : city.name 
//the date: list[0].dt_txt
//icon representation of weather conditions: list[0].weather[0].icon
//temperature: list[0].main.temp || get back in Kelvin
//humidity: list[0].main.humidity
//wind speed: list[0].wind.speed



var handleSearch = function (event){
    event.preventDefault();
    
    var city = cityInput.value.trim(); 

    getCoordinates(city);
};

searchButton.addEventListener('click', handleSearch);