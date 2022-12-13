var cityInput = document.querySelector('#cityInput');
var searchButton = document.querySelector('#searchButton');

var cityName = 'new york';
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

var handleSearch = function (event){
    event.preventDefault();
    console.log('button clicked');
    
    var city = cityInput.value.trim(); 
    console.log(city);
    getCoordinates(city);
};

searchButton.addEventListener('click', handleSearch);



// var lat = '';
// var lon = '';


// transfer coordinates data into getWeather


// function getWeather (){
//     latUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon +'&appid=0cf0c8196ec606a9f30889804aba9ea1';

//     fetch(latUrl)
//         .then(function(response){
//             return response.json();
//         })
//         .then(function (data){
//             console.log(data);
//         })
//         .catch(function (error){
//             console.log(error);
//         })
    
// }; 