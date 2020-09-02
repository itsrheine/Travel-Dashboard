

var searchButton = document.querySelector(".searchButton");
var inputValue = docuent.querySelector(".inputValue");

// storage array
var citySearched = [];

// local storage


localStorage.setItem();
localStorage.getItem();




// dashboard - Weather 5-Day forecast
var cityWeather = function(value) {

    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+value+"&appid=386eafe2ba649945a853251bb7d3f25e";

    // make a request to the url
    fetch(apiUrl).then(function(response) {

        // request was successful
        if (response.ok) {
            response.json().then(function(data) {

            // loop from day one to day 6
            for (var i = 1; i <6; i++) {

                // query selector variables
                var dateEl = document.querySelector("#day" + i);
                var tempEl = document.querySelector("#temp" + i);
                var descEl = document.querySelector("#desc" + i);
                var iconEl = document.querySelector("#icon" + i);

                // equation variables
                var date = moment().add.(i, 'days').format('l');
                dateEl.innerHTML = date;

                var temperatureValue = data.list[i].main.temp;
                var temperatureFarhenheit = Math.round(((temperatureValue - 273.15)*1.8)+32) + "°F";
                tempEl.innerHTML = temperatureFarhenheit;

                var descriptionValue = data.list[i].weather.description;
                descEl.innerHTML = descriptionValue;

                var iconVal = data.list[i].weather[0].icon;
                iconEl.setAttribute("src", "https://openweathermap.org/img/w/" + iconVal + ".png");

            }
            })
        }
    })
}


// when search button is clicked
var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityInput = inputValue.value.trim();
    if (cityInput) {
        
        localStorage.setItem("", JSON.stringify(citySearched));
    }
    cityWeather(cityInput);
}

searchButton.addEventListener("click", formSubmitHandler);
