function myFunction() {

    var cityValue = localStorage.getItem("cityValue");

    // for the headers
    var cityNameElW = document.querySelector(".cityNameElW");
    cityNameElW.innerHTML = cityValue.toUpperCase();

    var cityNameElT = document.querySelector("#title");
    cityNameElT.innerHTML = cityValue.toUpperCase() + " TRAVEL";
   

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
            // console.log(data)

                let x = 4;
                let i = 1;

                while (i < 6) {
                    
                    var dateEl = document.querySelector("#day" + i);
                    var tempEl = document.querySelector("#temp" + i);
                    var iconEl = document.querySelector("#Icon" + i);

                    var date = moment().add(i, 'days').format('l');
                    dateEl.innerHTML = date;
                    // console.log("value for x: " + x)
                    
                    var temperatureValue = data.list[x].main.temp;
                    // console.log("temp: " + temperatureFarhenheit);
                    var temperatureFarhenheit = Math.round(((temperatureValue - 273.15) * 1.8) + 32) + "°F";
                    tempEl.innerHTML = temperatureFarhenheit;

                    var iconVal = data.list[x].weather[0].icon; // this is the code
                    // console.log("icon: " + iconVal);

                    if (iconVal === "50n" || iconVal === "50d") {
                        iconEl.classList.add("height: 64, width: 64");
                    }
                    else {
                        iconEl.setAttribute("src", "./assets/images/icons/" + iconVal + ".svg");
                    }

                    x += 8
                    i++
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
                cityFood(coord);

            })
        }
    })
}


// Hotel Dashboard
var hotelSearch = function (value) {

    var corsInput = "https://cors-anywhere.herokuapp.com/" //Fixes "cors" error.
    var hotelApi = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + value + "&radius=10000&type=hotel&keyword=hotel&key=AIzaSyA8cerxaXUNfNgMNLFXuh4NPEkM5i7mLXc";
    var hotelUrl = corsInput + hotelApi;
    
    fetch(hotelUrl).then(function (response) {
        return response.json();
    })
        .then(function (response) {
            // console.log(response)
            /* SORTING RESPONSE BY RATING FROM WORST TO BEST z*/
            var responseList = response.results.sort(function (a, b) {
                var hotelList = (a.rating < b.rating) ? -1 : (a.rating > b.rating) ? 1 : 0;
                return hotelList;
            });

            /* CYCLE THROUGH FROM END OF ARRAY (counts down from 20 to 15) */
            for (var i = responseList.length - 1; i >= 15; i--) {
                // LINKS VARIABLES TO DOCUMENT ELEMENTS //
                // console.log(responseList)
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

                if (responseList[i].photos === undefined) { //if there is no hotel map link it just display business status.
                    var businessStatus = responseList[i].business_status;

                    function titleCase(string) { //changes string into proper casing.
                        businessStatus = string.toLowerCase().split("_"); //gets rid of underscore for Temporarily_closed
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
                    hotelMapEl.appendChild(p);

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

                    /* CREATES BUSINESS STATUS */
                    p = document.createElement('p');
                    p.innerHTML = "Status: " + businessStatus // <a>INNER_TEXT</a>
                    hotelMapEl.appendChild(p);



                    var hotelStr = responseList[i].photos[0].html_attributions[0];
                    // console.log("Checking str looks like String: \n", str); //checks is str is a string
                    var hotelRes = hotelStr.split('"'); //Splits string by every quotation mark.

                    /* CREATES LINK */
                    a = document.createElement('a');
                    a.href = hotelRes[1]; // Insted of calling setAttribute
                    a.innerHTML = "Hotel Location" // <a>INNER_TEXT</a>
                    hotelMapEl.appendChild(a);

                };
            };
        });
};


var photoSearch = function (value) {
    var cityName = value.toLowerCase();


    if (cityName === "san francisco") { //fixes san francisco bug.
        cityName = cityName.replace(/san francisco/g, "san-francisco-bay-area");

        var photoURL = "https://api.teleport.org/api/urban_areas/slug:" + cityName + "/images/";

        fetch(photoURL).then(function (response) {
            return response.json();
        })
            .then(function (response) {

                var cityPhotoEl = document.getElementById("cityImage");
                var photoLink = response.photos[0].image.web;
                /* INSERTS PHOTO */
                cityPhotoEl.setAttribute("src", photoLink)

            });


        }else if(cityName === "portland") {    //spaces are converted to dashes. 
            cityName = cityName.replace(/portland/g, "portland-or");

            
            var photoURL = "https://api.teleport.org/api/urban_areas/slug:"+ cityName + "/images/";

            fetch(photoURL).then(function (response) {
                return response.json();
            })
                .then(function (response) {
                    
                    var cityPhotoEl = document.getElementById("cityImage");
                    var photoLink = response.photos[0].image.web;
                    /* INSERTS PHOTO */
                    cityPhotoEl.setAttribute("src", photoLink)
    
            }).catch(err => {
                console.log(err);
                var cityPhotoEl = document.getElementById("cityImage");
                /* INSERTS PHOTO */
                cityPhotoEl.setAttribute("src",'./assets/images/plane.jpg')
                
            });
        
        }else if(cityName.includes(" ")) {    //spaces are converted to dashes. 
            cityName = cityName.replace(/ /g, "-");


        var photoURL = "https://api.teleport.org/api/urban_areas/slug:" + cityName + "/images/";

        fetch(photoURL).then(function (response) {

            return response.json();
        })
            .then(function (response) {

                var cityPhotoEl = document.getElementById("cityImage");
                var photoLink = response.photos[0].image.web;
                /* INSERTS PHOTO */
                cityPhotoEl.setAttribute("src", photoLink)

            }).catch(err => {
                console.log(err);
                var cityPhotoEl = document.getElementById("cityImage");
                /* INSERTS PHOTO */
                cityPhotoEl.setAttribute("src",'./assets/images/plane.jpg')
                
            });
    
        } else { //just push through with lowercased cityName.

            var photoURL = "https://api.teleport.org/api/urban_areas/slug:" + cityName + "/images/";
    
            fetch(photoURL).then(function (response) {
                return response.json();
            })
                .then(function (response) {
    
                    var cityPhotoEl = document.getElementById("cityImage");
                    var photoLink = response.photos[0].image.web;
                    /* INSERTS PHOTO */
                    cityPhotoEl.setAttribute("src", photoLink)
    
                }).catch(err => {
                    console.log(err);
                    var cityPhotoEl = document.getElementById("cityImage");
                    /* INSERTS PHOTO */
                    cityPhotoEl.setAttribute("src",'./assets/images/plane.jpg')
                    
                })
            
            }    
}       
                

// Restaurant
var cityFood = function (value) {
    var corsInput = "https://cors-anywhere.herokuapp.com/" //Fixes "cors" error.
    var resturantApi = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + value + "&radius=5000&type=restaurant&keyword=restaurant&key=AIzaSyD3fr4ELXNC6kKlSBcVbjNyU_NxjXiK0p0";
    var foodUrl = corsInput + resturantApi;


    fetch(foodUrl).then(function (response) {
        return response.json();
    })
        .then(function (response) {
            
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
                    a.innerHTML = "Restaurant Location"
                    resturantMapEl.appendChild(a);

                };
            };
        });

};


// Modal
function formSubmitHandler() {

    var inputValue = document.getElementById("inputValue").value;
    localStorage.setItem("cityValue", inputValue);

}