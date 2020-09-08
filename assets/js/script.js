
var searchButton = document.querySelector(".searchButton");
// var inputValue = docuent.querySelector(".inputValue");

// storage array
var citySearched = [];

// local storage


// localStorage.setItem();
// localStorage.getItem();




// dashboard - Weather 5-Day forecast - search by city
var cityWeather = function (value) {

    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=+amman+&units=imperial&appid=386eafe2ba649945a853251bb7d3f25e";

    // make a request to the url
    fetch(apiUrl).then(function (response) {

        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                // loop from day one to day 6
                for (var i = 1; i < 6; i++) {

                    // query selector variables
                    var dateEl = document.querySelector("#day" + i);
                    var tempEl = document.querySelector("#temp" + i);
                    var descEl = document.querySelector("#desc" + i);
                    var iconEl = document.querySelector("#icon" + i);

                    // equation variables
                    // var date = moment().add.(i, 'days').format('l');
                    // dateEl.innerHTML = date;

                    // var temperatureValue = data.list[i].main.temp;
                    // var fixTemp = temperatureValue.toFixed(1);
                    // // tempEl.innerHTML = fixTemp + "&deg; F";

                    // var descriptionValue = data.list[i].weather.description;
                    // descEl.innerHTML = descriptionValue;

                    // var iconVal = data.list[i].weather[0].icon;
                    // iconEl.setAttribute("src", "https://openweathermap.org/img/w/" + iconVal + ".png");

                }
            })
        }
    })
}

// api key a9kdLi-v4txmsrRgTFeTgvVop5k6ldC0K1quPvEG7qqeKZSbsuXE0Ta6CdmOkY1gsbfOg6tGNlj8_0fkj2BKjteccbnYUXkrP59niNbGJUv5YpU7TyngFlTEgwRPX3Yx
// dashboard - grubHub - search by city
var cityFood = function () {
    foodApi="https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.715736,-117.161087&radius=1500&type=restaurant&keyword=restaurant&key=AIzaSyD3fr4ELXNC6kKlSBcVbjNyU_NxjXiK0p0"

           
                fetch(foodApi).then(function (response) {
                    return response.json();
                })
                    .then(function (response) {
console.log(response)
                        /* SORTING RESPONSE BY RATING */
                        var responseList = response.results.sort(function (a, b) {
                            var resturantList = (a.rating < b.rating) ? -1 : (a.rating > b.rating) ? 1 : 0;
                            return resturantList;
                        });
                        for (var i = responseList.length - 1; i >= 14; i--) {
                            // LINKS VARIABLES TO DOCUMENT ELEMENTS //
                            var resturantNameEl = document.getElementById("resturant-name" + i);
                            var resturantAddressEl = document.getElementById("resturant-address" + i);
                            var resturantRatingEl = document.getElementById("resturant-rating" + i);
                            var resturantMapEl = document.getElementById("resturant-map" + i);

                            console.log(i);
                            var resturantName = responseList[i].name;
                            resturantNameEl.innerText = resturantName;

                            var resturantAddress = responseList[i].vicinity;
                            resturantAddressEl.innerText = resturantAddress;

                            var resturantRating = responseList[i].rating;
                            resturantRatingEl.innerHTML = resturantRating + "&#9733" + " rating";

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
                        };
                    });
            }
// var findresturantList = function (response) {
//     // loop the arry
//     var resturantList = []
//     response.map((resturant, i) => {
//         if (resturantList.length < 5) {
//             resturantList.push(resturant)
//             console.log(resturant);
//         } else {
//             for (let k = 0; k < 5; k++) {
//                 if (resturant.rating > resturantList[k].rating) {
//                     resturantList.splice(k, 1, resturant)
//                     break;
//                 }
//             }
//         }
//     })

//     console.log(resturantList)
// create a new obj to pass var resturantList into container

//     for (var i = 0 ; i < resturantList.length ; i++) {
//         // LINKS VARIABLES TO DOCUMENT ELEMENTS //
//         var resturantNameEl = document.getElementById("resturant-name" + i);
//         var resturantAddressEl = document.getElementById("resturant-address" + i);
//         var resturantRatingEl = document.getElementById("resturant-rating" + i);
//         var resturantMapEl = document.getElementById("resturant-map" + i);

// console.log(i);
//         var resturantName = resturantList[i].name;
//         resturantNameEl.innerText = resturantName;

//         var resturantAddress = resturantList[i].vicinity;
//         resturantAddressEl.innerText = resturantAddress;

//         var resturantRating = resturantList[i].rating;
//         resturantRatingEl.innerHTML = resturantRating + "&#9733" + " rating";

//         var resturantStr = resturantList[i].photos[0].html_attributions[0];

//         var resturantRes = resturantStr.split('"');

//         /* CREATES LINK */
//         a = document.createElement('a');
//         a.href = resturantRes[1]; // Insted of calling setAttribute
//         a.class = "muted-link";
//         a.innerHTML = "resturant Location" // <a>INNER_TEXT</a>
//         resturantMapEl.appendChild(a);

//     };

// };
// findresturantList(data);


// when search button is clicked
// var formSubmitHandler = function(event) {
//     event.preventDefault();

//     var cityInput = inputValue.value.trim();
//     if (cityInput) {

//         localStorage.setItem("", JSON.stringify(citySearched));
//     }
//     cityWeather(cityInput);
// }
cityFood()
    // searchButton.addEventListener("click", cityFood)
        