var cityInput = document.querySelector('#cityInput');
var searchButton = document.querySelector('#searchButton');
var resultsEl = document.querySelector('#results');

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
        cardTextTemp.textContent = 'temp' + temp; 

        var cardTextHumid = document.createElement('p');
        cardTextHumid.className = 'card-text';
        cardTextHumid.textContent = 'humidity' + humid;

        var cardTextWind = document.createElement('p');
        cardTextWind.className = 'card-text';
        cardTextWind.textContent = 'wind' + wind;
        
        var cardDate = document.createElement('p');
        cardDate.className = 'card-text';
        cardDate.textContent = 'time' + dayTime;

        resultsEl.appendChild(cardEl);
        cardEl.appendChild(cardBody);
        cardBody.append(cardTitleEl, cardDate, cardIconEl, cardTextTemp, cardTextHumid, cardTextWind);
    }
   
};


function displayToday (results){
    resultsEl.innerHTML = null;
    
        var cityName = results.name;
        var dayTime = results.dt;
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
        cardTextTemp.textContent = 'temp' + temp; 

        var cardTextHumid = document.createElement('p');
        cardTextHumid.className = 'card-text';
        cardTextHumid.textContent = 'humidity' + humid;

        var cardTextWind = document.createElement('p');
        cardTextWind.className = 'card-text';
        cardTextWind.textContent = 'wind' + wind;
        
        var cardDate = document.createElement('p');
        cardDate.className = 'card-text';
        cardDate.textContent = 'time' + dayTime;

        resultsEl.appendChild(cardEl);
        cardEl.appendChild(cardBody);
        cardBody.append(cardTitleEl, cardDate, cardIconEl, cardTextTemp, cardTextHumid, cardTextWind);
    
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
    fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=0cf0c8196ec606a9f30889804aba9ea1' + '&units=imperial';
    todayUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon + '&appid=0cf0c8196ec606a9f30889804aba9ea1' + '&units=imperial';
    
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


var handleSearch = function (event){
    event.preventDefault();
    var city = cityInput.value.trim(); 
    getCoordinates(city);
    localStorage.setItem('city', city);
};

searchButton.addEventListener('click', handleSearch);