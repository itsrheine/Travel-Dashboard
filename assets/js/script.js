

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
                // var date = moment().add.(i, 'days').format('l');
                // dateEl.innerHTML = date;

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

var cityFood = function (value) {
    var corsInput = "https://cors-anywhere.herokuapp.com/" //Fixes "cors" error.
    var resturantApi = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + value + "&radius=1500&type=restaurant&keyword=restaurant&key=AIzaSyD3fr4ELXNC6kKlSBcVbjNyU_NxjXiK0p0";
    var foodUrl = corsInput + resturantApi;
    

    fetch(foodUrl).then(function (response) {
        return response.json();
    })
        .then(function (response) {
            console.log(response)
            /* SORTING RESPONSE BY RATING */
            var responseList = response.results.sort(function (a, b) {
                var resturantList = (a.rating < b.rating) ? -1 : (a.rating > b.rating) ? 1 : 0;
                return resturantList;
            });
            for (var i = responseList.length - 1; i >= 15; i--) {
                // LINKS VARIABLES TO DOCUMENT ELEMENTS //
                var resturantNameEl = document.getElementById("resturant-name" + i);
                var resturantAddressEl = document.getElementById("resturant-address" + i);
                var resturantRatingEl = document.getElementById("resturant-rating" + i);
                var resturantMapEl = document.getElementById("resturant-map" + i);

                //add resturant names
                var resturantName = responseList[i].name;
                resturantNameEl.innerText = resturantName;
                //add resturant address
                var resturantAddress = responseList[i].vicinity;
                resturantAddressEl.innerText = resturantAddress;
                //add rating
                var resturantRating = responseList[i].rating;
                resturantRatingEl.innerHTML = resturantRating + "&#9733" + " rating";
                
                if (responseList[i].photos === undefined) {
                    var businessStatus = responseList[i].business_status;

                    function titleCase(string) {
                        businessStatus = string.toLowerCase().split("_");
                        for (var i = 0; i < businessStatus.length; i++) {
                            businessStatus[i] = businessStatus[i][0].toUpperCase() + businessStatus[i].slice(1);
                        }
                        businessStatus.join(" ");
                        return businessStatus
                    };
                    titleCase(businessStatus)

                    /* CREATES BUSINESS STATUS */
                    p = document.createElement('p');
                    p.innerHTML = "Status: " + businessStatus // <a>INNER_TEXT</a>
                    resturantMapEl.appendChild(p);
                } else {
                    var businessStatus = responseList[i].business_status;

                    function titleCase(string) {
                        businessStatus = string.toLowerCase().split("_");
                        for (var i = 0; i < businessStatus.length; i++) {
                            businessStatus[i] = businessStatus[i][0].toUpperCase() + businessStatus[i].slice(1);
                        }
                        businessStatus.join(" ");
                        return businessStatus
                    };
                    titleCase(businessStatus)

                    //find out if the store open or close
                    p = document.createElement('p');
                    p.innerHTML = "Status: " + businessStatus 
                    resturantMapEl.appendChild(p);


                    var resturantStr = responseList[i].photos[0].html_attributions[0];
                    var resturantRes = resturantStr.split('"'); 

                    //add map location 
                    a = document.createElement('a');
                    a.href = resturantRes[1];
                    a.innerHTML = "resturant Location" 
                    resturantMapEl.appendChild(a);

                };
            };
        });

};




cityFood()

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


// add searched item to localStorage
function formSubmitHandler() {
    
    var inputValue = document.getElementById("inputValue").value;
    localStorage.setItem("cityValue", inputValue);

}
