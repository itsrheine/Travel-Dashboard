


var cityFood = function () {
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

