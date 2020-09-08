function myFunction() {

    var cityValue = localStorage.getItem("cityValue");

    // for the headers
    var cityNameElW = document.querySelector(".cityNameElW");
    cityNameElW.innerHTML = cityValue;
    var cityNameElH = document.querySelector(".cityNameElH");
    cityNameElH.innerHTML = cityValue;
    var cityNameElE = document.querySelector(".cityNameElE");
    cityNameElE.innerHTML = cityValue;
    var cityNameElT = document.querySelector("#title");
    cityNameElT.innerHTML = cityValue + " Travel";

    get5Day(cityValue);
    cityCoord(cityValue);
    photoSearch(cityValue);
}

// Weather Dashboard
var get5Day = function (value) {

    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + "&appid=386eafe2ba649945a853251bb7d3f25e";

    // make a request to the url
    fetch(apiUrl).then(function (response) {

        // request was successful
        if (response.ok) {
            response.json().then(function (data) {

                for (var i = 1; i < 6; i++) {

                    // variables - 5 day forecast
                    var dateEl = document.querySelector("#day" + i);
                    var tempEl = document.querySelector("#temp" + i);
                    var humiEl = document.querySelector("#hum" + i);
                    var iconEl = document.querySelector("#Icon" + i);

                    // secondary dashboard
                    var date = moment().add(i, 'days').format('l');
                    dateEl.innerHTML = date;

                    var temperatureValue = data.list[i].main.temp;
                    var temperatureFarhenheit = Math.round(((temperatureValue - 273.15) * 1.8) + 32) + "°F";
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


// get city's coordinates & uv index for main dashboard
var cityCoord = function (data) {

    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + data + "&appid=386eafe2ba649945a853251bb7d3f25e";

    // make a request to the url
    fetch(apiUrl).then(function (response) {

        // request was successful
        if (response.ok) {
            response.json().then(function (data) {

                // get remaining data for dashboard
                var lonValue = data['coord']['lon'];
                var latValue = data['coord']['lat'];

                var coord = (latValue + "," + lonValue);
                hotelSearch(coord);
                // cityFood(coord);

            })
        }
    })
}


// Hotel Dashboard
var hotelSearch = function (value) {

    var corsInput = "https://cors-anywhere.herokuapp.com/" //Fixes "cors" error.
    var hotelApi = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + value + "&radius=1500&type=hotel&keyword=hotel&key=AIzaSyA8cerxaXUNfNgMNLFXuh4NPEkM5i7mLXc";
    var hotelUrl = corsInput + hotelApi;

    fetch(hotelUrl).then(function (response) {
        return response.json();
    })
        .then(function (response) {

            /* SORTING RESPONSE BY RATING FROM WORST TO BEST */
            var responseList = response.results.sort(function (a, b) {
                var hotelList = (a.rating < b.rating) ? -1 : (a.rating > b.rating) ? 1 : 0;
                return hotelList;
            });

            /* CYCLE THROUGH FROM END OF ARRAY (counts down from 20 to 15) */
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

                if (responseList[i].photos === undefined) {
                    var businessStatus = responseList[i].business_status;
                    
                    function titleCase(string) {
                        businessStatus = string.toLowerCase().split("_");
                        for(var i = 0; i< businessStatus.length; i++){
                            businessStatus[i] = businessStatus[i][0].toUpperCase() + businessStatus[i].slice(1);
                        }
                        businessStatus.join(" ");
                        return businessStatus
                    };
                    titleCase(businessStatus)

                    /* CREATES BUSINESS STATUS */
                    p = document.createElement('p');
                    p.innerHTML = "Status: " + businessStatus // <a>INNER_TEXT</a>
                    hotelMapEl.appendChild(p);
                    // console.log(responseList[i].photos[0].html_attributions);
                } else {
                    var businessStatus = responseList[i].business_status;

                    function titleCase(string) {
                        businessStatus = string.toLowerCase().split("_");
                        for(var i = 0; i< businessStatus.length; i++){
                            businessStatus[i] = businessStatus[i][0].toUpperCase() + businessStatus[i].slice(1);
                        }
                        businessStatus.join(" ");
                        return businessStatus
                    };
                    titleCase(businessStatus)

                    /* CREATES BUSINESS STATUS */
                    p = document.createElement('p');
                    p.innerHTML = "Status: " + businessStatus // <a>INNER_TEXT</a>
                    hotelMapEl.appendChild(p);
                    // console.log(responseList[i].photos[0].html_attributions);

                    
                    var hotelStr = responseList[i].photos[0].html_attributions[0];
                    // console.log("Checking str looks like String: \n", str); //checks is str is a string
                    var hotelRes = hotelStr.split('"'); //Splits string by every quotation mark.

                    /* CREATES LINK */
                    a = document.createElement('a');
                    a.href = hotelRes[1]; // Insted of calling setAttribute
                    a.innerHTML = "Hotel Location" // <a>INNER_TEXT</a>
                    hotelMapEl.appendChild(a);
                    // console.log(responseList[i].photos[0].html_attributions);
                };
            };
        });
};


var photoSearch = function (value) { 
    var cityName = value.toLowerCase();


        if (cityName = "san francisco") {
            cityName = cityName.replace(/san francisco/g, "san-francisco-bay-area");

            
            var photoURL = "https://api.teleport.org/api/urban_areas/slug:"+ cityName + "/images/";

            fetch(photoURL).then(function (response) {
                return response.json();
            })
                .then(function (response) {
                    
                    var cityPhotoEl = document.getElementById("cityImage");
                    var photoLink = response.photos[0].image.web;
                    /* INSERTS PHOTO */
                    cityPhotoEl.setAttribute("src", photoLink)
    
            });


        }else if(cityName.includes(" ")) {    //spaces are converted to dashes. 
            cityName = cityName.replace(/ /g, "-");

            
            var photoURL = "https://api.teleport.org/api/urban_areas/slug:"+ cityName + "/images/";

            fetch(photoURL).then(function (response) {
                return response.json();
            })
                .then(function (response) {
                    
                    var cityPhotoEl = document.getElementById("cityImage");
                    var photoLink = response.photos[0].image.web;
                    /* INSERTS PHOTO */
                    cityPhotoEl.setAttribute("src", photoLink)
    
            });
        
        } else {
    
            var photoURL = "https://api.teleport.org/api/urban_areas/slug:"+ cityName + "/images/";

            fetch(photoURL).then(function (response) {
                return response.json();
            })
                .then(function (response) {
                    
                    var cityPhotoEl = document.getElementById("cityImage");
                    var photoLink = response.photos[0].image.web;
                    /* INSERTS PHOTO */
                    cityPhotoEl.setAttribute("src", photoLink)
    
            });
        }
     console.log(cityName)
    
};
