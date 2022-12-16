var cityInput = document.querySelector('#cityInput');
var searchButton = document.querySelector('#searchButton');
var resultsEl = document.querySelector('#fiveDayResults');
var todayResults = document.querySelector('#todayResults');
var searchHistory = document.querySelector('#searchHistory');
var apiKey = '0cf0c8196ec606a9f30889804aba9ea1';

function displayFiveDay (results){
    // console.log(results);
    resultsEl.innerHTML = null;
    
    for (var i = 0; i < results.list.length ; i+= 8) {
        // console.log(i);
        var cityName = results.city.name;
        var dayTime = results.list[i].dt_txt;
        var icon = results.list[i].weather[0].icon;
        var temp = results.list[i].main.temp;
        var humid = results.list[i].main.humidity;
        var wind = results.list[i].wind.speed;
        console.log(cityName, dayTime, icon, temp, humid, wind);
        
        var cardEl = document.createElement('div');
        cardEl.className = 'card p-3';
        
        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        
        var cardTitleEl = document.createElement('h5');
        cardTitleEl.className = 'card-title';
        cardTitleEl.textContent = cityName;
    
        var cardIconEl = document.createElement('img');
        var cardIcon = "https://openweathermap.org/img/wn/" + icon + ".png";
        cardIconEl.setAttribute('src', cardIcon);
        
        var cardTextTemp = document.createElement('p');
        cardTextTemp.className = 'card-text';
        cardTextTemp.textContent = 'TEMPERATURE: ' + temp + '\u00B0 F'; 

        var cardTextHumid = document.createElement('p');
        cardTextHumid.className = 'card-text';
        cardTextHumid.textContent = 'HUMIDITY: ' + humid + '%';

        var cardTextWind = document.createElement('p');
        cardTextWind.className = 'card-text';
        cardTextWind.textContent = 'WIND SPEED: ' + wind + ' MPH';
        
        var cardDate = document.createElement('p');
        cardDate.className = 'card-text';
        cardDate.textContent = 'TIME: ' + dayTime;

        resultsEl.appendChild(cardEl);
        cardEl.appendChild(cardBody);
        cardBody.append(cardTitleEl, cardDate, cardIconEl, cardTextTemp, cardTextHumid, cardTextWind);
    }
};

function displayToday (results){
    todayResults.innerHTML = null;
    
        var dayTime = results.dt;
        var newDayTime = new Date(dayTime * 1000);
    
        var cityName = results.name;
        var icon = results.weather[0].icon;
        var temp = results.main.temp;
        var humid = results.main.humidity;
        var wind = results.wind.speed;
        console.log(cityName, dayTime, icon, temp, humid, wind);

        var cardEl = document.createElement('div');
        cardEl.className = 'card p-3';
        
        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        
        var cardTitleEl = document.createElement('h5');
        cardTitleEl.className = 'card-title';
        cardTitleEl.textContent = cityName;
    
        var cardIconEl = document.createElement('img');
        var cardIcon = "https://openweathermap.org/img/wn/" + icon + ".png";
        cardIconEl.setAttribute('src', cardIcon);
        
        var cardTextTemp = document.createElement('p');
        cardTextTemp.className = 'card-text';
        cardTextTemp.textContent = 'TEMPERATURE: ' + temp + '\u00B0 F'; 

        var cardTextHumid = document.createElement('p');
        cardTextHumid.className = 'card-text';
        cardTextHumid.textContent = 'HUMIDITY: ' + humid + '%';

        var cardTextWind = document.createElement('p');
        cardTextWind.className = 'card-text';
        cardTextWind.textContent = 'WIND SPEED: ' + wind + ' MPH';
        
        var cardDate = document.createElement('p');
        cardDate.className = 'card-text';
        cardDate.textContent = 'TIME: ' + newDayTime;

        todayResults.appendChild(cardEl);
        cardEl.appendChild(cardBody);
        cardBody.append(cardTitleEl, cardDate, cardIconEl, cardTextTemp, cardTextHumid, cardTextWind);
    
};



// geocodeUrl gives back data on lat and lon
function getCoordinates (cityName){
    var geocodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;

    
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
    fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
    todayUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
    
    fetch(fiveDayUrl)
    .then(function(response){
        return response.json();
    })
    .then(function (data){
        console.log(data); 
        displayFiveDay(data);
    })
    .catch(function (error){
        console.log(error);
    })

    fetch(todayUrl)
    .then(function(response){
        return response.json();
    })
    .then(function (data){
        console.log(data); 
        displayToday(data);
    })
    .catch(function (error){
        console.log(error);
    })
    
}; 

var renderLocal = function () {
    
    for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);

        var lastCityBtn = document.createElement('button');
        lastCityBtn.className = 'btn btn-outline-dark'
        lastCityBtn.textContent = `${localStorage.getItem(key)}`;
        searchHistory.append(lastCityBtn);
    }

};

searchButton.onclick = function (event){
    event.preventDefault();
    
    var city = cityInput.value.trim(); 
    getCoordinates(city);
    
    localStorage.setItem('city', city);
    renderLocal();
};

searchHistory.onclick = function(event){
    event.preventDefault();
    if (event.target.matches('button')){
        getCoordinates(event.target.textContent);
    }
};
