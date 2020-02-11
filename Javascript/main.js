// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCMCtFDFzlzJh6qrWFZ_pqFJ-ELhweBNkY",
  authDomain: "project-1-608e1.firebaseapp.com",
  databaseURL: "https://project-1-608e1.firebaseio.com",
  projectId: "project-1-608e1",
  storageBucket: "project-1-608e1.appspot.com",
  messagingSenderId: "510274083998",
  appId: "1:510274083998:web:422fb226e2251b2f22ef8f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$(".submit").on("click", function (event) {

  event.preventDefault();

  var ccaKey = "20250d43dabf3feedeba";
  var from = $(".from").val();
  var to = $(".to").val();
  var amount = $(".amount").val()

  console.log(from)
  console.log(to)

  $.ajax({
    url: "https://free.currconv.com/api/v7/convert?q=" + from + "_" + to + "&compact=ultra&apiKey=" + ccaKey,
    method: "GET"
  }).then(function (response) {
    console.log(" ");
    console.log("-------------------------------");
    console.log("Currency Converter API");
    console.log("-------------------------------");
    console.log(response);

    var test = Object.values(response)[0];
    var newRate = Math.round(amount * test);

    console.log(test)

    console.log(to)
    console.log(newRate)

    $(".newCountry").append(" ", to);
    $(".newAmount").append(" ", newRate);

    // reset()

  });

  // Currency Converter Country List //
  // ============================================= //

  $.ajax({
    url: "https://free.currconv.com/api/v7/currencies?apiKey=20250d43dabf3feedeba",
    method: "GET"
  }).then(function (response) {
    console.log(" ");
    console.log("-------------------------------");
    console.log("Currency Converter Country List");
    console.log("-------------------------------");
    console.log(response);
    console.log(response.results.USD.currencySymbol)
    console.log(Object.values(response.results));

    var objectToArray = Object.values(response.results);
    var to = $(".to").val();
    for (var i = 0; i < objectToArray.length; i++) {
      var symbol = objectToArray[i].currencySymbol
      console.log(objectToArray[i].id);
      console.log(to)
      if (to === objectToArray[i].id) {
        $(".newSymbol").append(symbol);
        console.log(symbol);
      }
    }

  });
});



// Financial Modeling Prep API //
// ============================================= //  

$.ajax({
  url: "https://financialmodelingprep.com/api/v3/majors-indexes",
  method: "GET"
}).then(function (response) {
  console.log(" ");
  console.log("-------------------------------");
  console.log("Financial Modeling Prep");
  console.log("-------------------------------");
  console.log(response);

  $(".dowJones").append(" ", response.majorIndexesList[0].indexName);
  $(".dowJones").append(" ", response.majorIndexesList[0].price);

  $(".nasdaq").append(" ", response.majorIndexesList[1].indexName);
  $(".nasdaq").append(" ", response.majorIndexesList[1].price);

  $(".sp").append(" ", response.majorIndexesList[2].indexName);
  $(".sp").append(" ", response.majorIndexesList[2].price);

  $(".cac").append(" ", response.majorIndexesList[3].indexName);
  $(".cac").append(" ", response.majorIndexesList[3].price);
});

// Reset Form //
// ============================================= //  

function reset() {
  $(".from").val(" ");
  $(".to").val(" ");
  $(".amount").val(" ");
}