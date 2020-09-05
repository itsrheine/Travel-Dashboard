
var searchButton1 = document.querySelector(".searchButton1");
var inputValue = document.querySelector(".inputValue");

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



searchButton1.addEventListener("click", formSubmitHandler);
searchButton2.addEventListener("click", formSubmitHandler);