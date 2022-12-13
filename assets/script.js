var cityInput = document.querySelector('#cityInput');
var searchButton = document.querySelector('#searchButton');



var cityName = 'new york';
// geocodeUrl gives back data on lat and lon
geocodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=0cf0c8196ec606a9f30889804aba9ea1';

function getCoordinates (event){
    
    fetch(geocodeUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log('LAT: ' + data[0].lat + ' LON: ' + data[0].lon);
            console.log(data);
        })
        .catch(function (error){
            console.log(error);
        });
};

var handleSearch = function (event){
    event.preventDefault();
    var city = cityInput.value.trim(); 
    fetchCoordinates(city);
    // console.log('button clicked');
};

searchButton.addEventListener('click', handleSearch);



// var lat = '';
// var lon = '';


// // if we have a cityName, make lat and lon the values from that data recieved
// if (cityName){
//     var lat = '';
//     var lon = '';
//     latUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon +'&appid=0cf0c8196ec606a9f30889804aba9ea1';
// };

function getWeather (){
    
    fetch(latUrl)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
        })
        .catch(function (error){
            console.log(error);
        })
    
}; 