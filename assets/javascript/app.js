$(document).ready(function() {


      // Initial array of pets
      var pet = ["Cat", "Dog", "Bird", "Fish", "Snake", 
      "Gerbel", "Guinea Pig", "Hamster", "Hedge Hog", "Ferret", "Sugar Glider", "Chinchilla"];

      // function to make buttons and add to page
      function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

           for (var i = 0; i < arrayToUse.length; i++) {
                var a = $("<button>");
                  a.addClass(classToAdd);
                  a.attr("data-type", arrayToUse[i]);
                  a.text(arrayToUse[i]);
                  $(areaToAddTo).append(a);
        }     

      }

        $(document).on("click", ".pet-button", function() {
        $("#pet").empty();
        $(".pet-button").removeClass("active");
        $(this).addClass("active");

      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

   $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

     for (var i = 0; i < results.length; i++) {
        var petDiv = $("<div class=\"pet-item\">");

       var rating = results[i].rating;

       var p = $("<p>").text("Rating: " + rating);

       var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

       var petImage = $("<img>");
        petImage.attr("src", still);
        petImage.attr("data-still", still);
        petImage.attr("data-animate", animated);
        petImage.attr("data-state", "still");
        petImage.addClass("pet-image");

       petDiv.append(p);
        petDiv.append(petImage);

       $("#pet").append(petDiv);
      }
    });
  });

 $(document).on("click", ".pet-image", function() {

   var state = $(this).attr("data-state");

   if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

 $("#add-pet").on("click", function(event) {
    event.preventDefault();
    var newPet = $("input").eq(0).val();

   if (newPet.length > 2) {
      pet.push(newPet);
    }

   populateButtons(pet, "pet-button", "#pet-buttons");

 });

 populateButtons(pet, "pet-button", "#pet-buttons");
});