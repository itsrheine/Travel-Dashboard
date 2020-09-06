
var searchButton1 = document.querySelector(".searchButton1");
var inputValue = document.querySelector(".inputValue").value;

// modal variables
var modal = document.getElementById("myModal");
var searchButton2 = document.querySelector("#searchButton2");
var span = document.getElementsByClassName("close")[0];

var citiesSearched = [];

// when search button is clicked 
var formSubmitHandler = function(event) {
    event.preventDefault();

    get5Day(inputValue);

};    

// second search modal
searchButton2.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 5 Day Weather Forecast
var get5Day = function (value) {

    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+value+"&appid=386eafe2ba649945a853251bb7d3f25e";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        
        // request was successful
        if (response.ok) {            
            response.json().then(function(data) {
                     
            for (var i = 1; i < 6; i++) {

                // variables - 5 day forecast
                var dateEl = document.querySelector("#day" + i);
                var tempEl = document.querySelector("#temp" + i);
                var humiEl = document.querySelector("#hum" + i);
                var iconEl = document.querySelector("#Icon" + i);

                // secondary dashboard
                var date = moment().add(i, 'days').format('l');
                console.log(date);
                dateEl.innerHTML = date;
                
                var temperatureValue = data.list[i].main.temp;
                var temperatureFarhenheit = Math.round(((temperatureValue - 273.15)*1.8)+32) + "°F";
                tempEl.innerHTML = temperatureFarhenheit;                    
                
                var humidityValue = data.list[i].main.humidity + "%";
                humiEl.innerHTML = humidityValue;

                var iconVal = data.list[i].weather[0].icon; // this is the code
                iconEl.setAttribute("src", "https://openweathermap.org/img/w/" + iconVal + ".png");
            
                }        
            })
        }
    })
}

// local storage and saving
var localSafe = function () {

    // local storage
   var oldCities = JSON.parse(localStorage.getItem('oldCities'));
    if (oldCities === null) {
        return;
    }
}

searchButton1.addEventListener("click", formSubmitHandler);