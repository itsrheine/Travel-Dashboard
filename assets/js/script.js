/*  
    After typing in my city and pressing enter
    I am presented with the city's top 5 hotels, restaurants and a 5 day forecast.
    Upon submitting city name.
    It's saved into local storage and displayed in your past searches next time you visit the app.
    When I click a specific restaurant or hotel.
    I am redirected to the hotel or restaurant's website.
    When I click the search button on the city display page.
    A modal where I can input a different city to search for will pop up and you can do the process over again.
*/

var searchButton = document.querySelector(".searchButton");
var inputValue = docuent.querySelector(".inputValue");

// storage array
var citySearched = [];

// local storage


localStorage.setItem();
localStorage.getItem();




// dashboard - Weather 5-Day forecast - search by city
var cityWeather = function(value) {

    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+value+"&units=imperial&appid=386eafe2ba649945a853251bb7d3f25e";

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
                var fixTemp = temperatureValue.toFixed(1);
                tempEl.innerHTML = fixTemp + "&deg; F";

                var descriptionValue = data.list[i].weather.description;
                descEl.innerHTML = descriptionValue;

                var iconVal = data.list[i].weather[0].icon;
                iconEl.setAttribute("src", "https://openweathermap.org/img/w/" + iconVal + ".png");

            }
            })
        }
    })
}

// api key a9kdLi-v4txmsrRgTFeTgvVop5k6ldC0K1quPvEG7qqeKZSbsuXE0Ta6CdmOkY1gsbfOg6tGNlj8_0fkj2BKjteccbnYUXkrP59niNbGJUv5YpU7TyngFlTEgwRPX3Yx
// dashboard - Yelp Food - search by city
var cityFood = function (value) {


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
