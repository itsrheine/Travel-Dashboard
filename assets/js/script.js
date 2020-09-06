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


// var searchButton = document.querySelector(".searchButton");
// var inputValue = docuent.querySelector(".inputValue");

// // storage array
// var citySearched = [];

// // local storage


// localStorage.setItem();
// localStorage.getItem();




// // dashboard - Weather 5-Day forecast - search by city
// var cityWeather = function(value) {

//     // format api url
//     var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+value+"&units=imperial&appid=386eafe2ba649945a853251bb7d3f25e";

//     // make a request to the url
//     fetch(apiUrl).then(function(response) {

//         // request was successful
//         if (response.ok) {
//             response.json().then(function(data) {

//             // loop from day one to day 6
//             for (var i = 1; i <6; i++) {

//                 // query selector variables
//                 var dateEl = document.querySelector("#day" + i);
//                 var tempEl = document.querySelector("#temp" + i);
//                 var descEl = document.querySelector("#desc" + i);
//                 var iconEl = document.querySelector("#icon" + i);

//                 // equation variables
//                 var date = moment().add.(i, 'days').format('l');
//                 dateEl.innerHTML = date;

//                 var temperatureValue = data.list[i].main.temp;
//                 var fixTemp = temperatureValue.toFixed(1);
//                 tempEl.innerHTML = fixTemp + "&deg; F";

//                 var descriptionValue = data.list[i].weather.description;
//                 descEl.innerHTML = descriptionValue;

//                 var iconVal = data.list[i].weather[0].icon;
//                 iconEl.setAttribute("src", "https://openweathermap.org/img/w/" + iconVal + ".png");

//             }
//             })
//         }
//     })
// }

// // api key a9kdLi-v4txmsrRgTFeTgvVop5k6ldC0K1quPvEG7qqeKZSbsuXE0Ta6CdmOkY1gsbfOg6tGNlj8_0fkj2BKjteccbnYUXkrP59niNbGJUv5YpU7TyngFlTEgwRPX3Yx
// // dashboard - Yelp Food - search by city
// var cityFood = function (value) {


// }

// // when search button is clicked
// var formSubmitHandler = function(event) {
//     event.preventDefault();

//     var cityInput = inputValue.value.trim();
//     if (cityInput) {
        
//         localStorage.setItem("", JSON.stringify(citySearched));
//     }
//     cityWeather(cityInput);
// }

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
                a.innerHTML = hotelName + " Map" // <a>INNER_TEXT</a>
                hotelMapEl.appendChild(a);
                // console.log(responseList[i].photos[0].html_attributions);
               
            };
            
            
            
        });

};
        
hotelSearch();
// searchButton.addEventListener("click", formSubmitHandler);
