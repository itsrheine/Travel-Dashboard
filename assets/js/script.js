
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
    fetch("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyD3fr4ELXNC6kKlSBcVbjNyU_NxjXiK0p0")
        .then(response => {
            response.json().then(data => {
            console.log(data);
                   // loop the arry
                    var topFive = []
                    console.log(topFive);
                    data.results.map((resturant, i) => {
                        if (topFive.length < 5) {
                            topFive.push(resturant)
                            console.log(resturant);
                        } else {
                            for (let k = 0; k < 5; k++) {
                                if (resturant.rating > topFive[k].rating) {
                                    topFive.splice(k, 1, resturant)
                                    break;
                                }
                            }
                        }
                    }) 
                    for (var i = 0 ; i < topFive.length ; i++) {
                        // LINKS VARIABLES TO DOCUMENT ELEMENTS //
                        var resturantNameEl = document.getElementById("resturant-name" + i);
                        var resturantAddressEl = document.getElementById("resturant-address" + i);
                        var resturantRatingEl = document.getElementById("resturant-rating" + i);
                        var resturantMapEl = document.getElementById("resturant-map" + i);
                
                console.log(i);
                        var resturantName = topFive[i].name;
                        resturantNameEl.innerText = resturantName;
                        
                        var resturantAddress = topFive[i].vicinity;
                        resturantAddressEl.innerText = resturantAddress;
                
                        var resturantRating = topFive[i].rating;
                        resturantRatingEl.innerHTML = resturantRating + "&#9733" + " rating";
                
                        var resturantStr = topFive[i].photos[0].html_attributions[0];
                        
                        var resturantRes = resturantStr.split('"');
                
                        /* CREATES LINK */
                        a = document.createElement('a');
                        a.href = resturantRes[1]; // Insted of calling setAttribute
                        a.class = "muted-link";
                        a.innerHTML = "resturant Location" // <a>INNER_TEXT</a>
                        resturantMapEl.appendChild(a);
                
                    };
                
                
            })
        })
        .catch(err => {
            console.log(err);
        });

}

// var findTopFive = function (response) {
//     // loop the arry
//     var topFive = []
//     response.map((resturant, i) => {
//         if (topFive.length < 5) {
//             topFive.push(resturant)
//             console.log(resturant);
//         } else {
//             for (let k = 0; k < 5; k++) {
//                 if (resturant.rating > topFive[k].rating) {
//                     topFive.splice(k, 1, resturant)
//                     break;
//                 }
//             }
//         }
//     })

//     console.log(topFive)
    // create a new obj to pass var topFive into container

//     for (var i = 0 ; i < topFive.length ; i++) {
//         // LINKS VARIABLES TO DOCUMENT ELEMENTS //
//         var resturantNameEl = document.getElementById("resturant-name" + i);
//         var resturantAddressEl = document.getElementById("resturant-address" + i);
//         var resturantRatingEl = document.getElementById("resturant-rating" + i);
//         var resturantMapEl = document.getElementById("resturant-map" + i);

// console.log(i);
//         var resturantName = topFive[i].name;
//         resturantNameEl.innerText = resturantName;
        
//         var resturantAddress = topFive[i].vicinity;
//         resturantAddressEl.innerText = resturantAddress;

//         var resturantRating = topFive[i].rating;
//         resturantRatingEl.innerHTML = resturantRating + "&#9733" + " rating";

//         var resturantStr = topFive[i].photos[0].html_attributions[0];
        
//         var resturantRes = resturantStr.split('"');

//         /* CREATES LINK */
//         a = document.createElement('a');
//         a.href = resturantRes[1]; // Insted of calling setAttribute
//         a.class = "muted-link";
//         a.innerHTML = "resturant Location" // <a>INNER_TEXT</a>
//         resturantMapEl.appendChild(a);

//     };

// };
    // findTopFive(data);
    
   
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