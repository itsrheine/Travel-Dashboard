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

// modal variables
var modal = document.getElementById("myModal");
var searchButton2 = document.querySelector("#searchButton2");
var span = document.getElementsByClassName("close")[0];

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

// Weather Dashboard
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


// Hotel Dashboard
var hotelSearch = function() {

    var corsInput = "https://cors-anywhere.herokuapp.com/" //Fixes "cors" error.
    var hotelApi = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=hotel&keyword=hotel&radius=1500&key=AIzaSyA8cerxaXUNfNgMNLFXuh4NPEkM5i7mLXc";
    var coord = "&location=" + "-33.8670522" + "," + "151.1957362";
    var hotelUrl = corsInput + hotelApi + coord;
        
    fetch(hotelUrl).then(function(response) {
    return response.json();
    })
        .then(function(response) { 
            
            /* SORTING RESPONSE BY RATING */
            var responseList = response.results.sort(function(a, b) {
                var hotelList = (a.rating < b.rating) ? -1 : (a.rating > b.rating) ? 1 : 0;
                return hotelList;
            });
            // console.log(responseList)
           
            /* CYCLE THROUGH ARRAY FROM (counts down from 20 to 15) */
            for (var i = responseList.length - 1; i >= 15; i--) {
                // LINKS VARIABLES TO DOCUMENT ELEMENTS //
                var hotelNameEl = document.getElementById("hotel-name" + i);
                var hotelAddressEl = document.getElementById("hotel-address" + i);
                var hotelRatingEl = document.getElementById("hotel-rating" + i);
                var hotelMapEl = document.getElementById("hotel-map" + i);
            

                var hotelName = responseList[i].name;
                hotelNameEl.innerText = hotelName;

                var hotelAddress = responseList[i].vicinity;
                hotelAddressEl.innerText = hotelAddress;

                var hotelRating = responseList[i].rating;
                hotelRatingEl.innerHTML = hotelRating + "&#9733" + " rating";

                var hotelStr = responseList[i].photos[0].html_attributions[0];
                // console.log("Checking str looks like String: \n", str); //checks is str is a string

                var hotelRes = hotelStr.split('"');
                
                /* CREATES LINK */
                a = document.createElement('a');
                a.href =  hotelRes[1]; // Insted of calling setAttribute
                a.class = "muted-link"; 
                a.innerHTML = "<div class='muted-link'>Hotel Location</div>" // <a>INNER_TEXT</a>
                hotelMapEl.appendChild(a);
                // console.log(responseList[i].photos[0].html_attributions);

                // /* CREATES LINK */
                // btn = document.createElement('BUTTON');
                // btn.onclick = "location.href=" + hotelRes[1]; // Insted of calling setAttribute
                // btn.class = "btn btn-secondary"
                // btn.innerText = "Hotel Location" // <a>INNER_TEXT</a>
                // hotelMapEl.appendChild(btn);
                // // console.log(responseList[i].photos[0].html_attributions);
               
            };
        });
};
        
hotelSearch();