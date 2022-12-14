var cityInput = document.querySelector('#cityInput');
var searchButton = document.querySelector('#searchButton');
var resultsEl = document.querySelector('#results');

function displayResults (results){
    // console.log(results);
    // var cityName;
    // var dayTime;
    // var icon;
    // var temp;
    // var humid;
    // var wind;
    
    for (var i = 0; i < results.list.length ; i++) {
        // console.log(i);
        cityName = results.city.name;
        dayTime = results.list[i].dt_txt;
        icon = results.list[i].weather[0].icon;
        temp = results.list[i].main.temp;
        humid = results.list[i].main.humidity;
        wind = results.list[i].wind.speed;
        console.log(cityName, dayTime, icon, temp, humid, wind);
    }
    // 
    //for (var result of results){

    //     var cardEl = document.createElement('div');
    //     cardEl.className = 'card';
        
    //     var cardBody = document.createElement('div');
    //     cardBody.className = 'card-body';
        
    //     var cardTitleEl = document.createElement('h5');
    //     cardTitleEl.className = 'card-title';
    //     cardTitleEl.textContent = results.city.name;

    //     var cardImgEl = document.createElement('img');
    //     cardImgEl.className = 'card-img';
    //     cardImgEl.src = data.list[0].weather[0].icon;
        
    //     var cardTextEl = document.createElement('p');
    //     cardText.className = 'card-text';
    //     cardText.textContent = results.list[0].main.temp, results.list[0].main.humidity, results.list[0].wind.speed; 

    // };
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
        // console.log(weatherResults);
        // var data = {
        //     cityName: city.name, 
        //     dayTime: list[0].dt_txt,
        //     icon: list[0].weather[0].icon,
        //     temp: list[0].main.temp,
        //     humid: list[0].main.humidity,
        //     wind: list[0].wind.speed,
        // };
        console.log(data);
        displayResults(data);
    })
    .catch(function (error){
        console.log(error);
    })
    
}; 


var handleSearch = function (event){
    event.preventDefault();
    var city = cityInput.value.trim(); 
    getCoordinates(city);
};

searchButton.addEventListener('click', handleSearch);