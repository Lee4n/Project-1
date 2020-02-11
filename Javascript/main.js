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

  var main = $("#resultsArea")
  var resultContainer = $("<div class='outputField'>");
  var resultSymbol = $("<div class='newSymbol'>");
  var resultAmount = $("<div class='newAmount'>");
  var resultCountry = $("<div class='newCountry'>");

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

    resultCountry.append(" ", to);
    resultAmount.append(" ", newRate);

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
        resultSymbol.append(symbol);
        console.log(symbol);
      }
    }

  });

  resultContainer.append(amount + " " + from + " = ")
  resultContainer.append(resultSymbol);
  resultContainer.append(resultAmount);
  resultContainer.append(resultCountry);

  main.append(resultContainer)
  main.css('font-size', '30px')
   
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
  $(".dowJones2").append(" ", response.majorIndexesList[0].price);
  $(".dowJones2").css('color', '#1E90FF');
  if (response.majorIndexesList[0].changes < 0) {
    $(".dowJones3").append(" ", response.majorIndexesList[0].changes);
    $(".dowJones3").css('color', '#FF0000');
  } else if (response.majorIndexesList[0].changes > 0) {
    $(".dowJones3").append(" ", response.majorIndexesList[0].changes);
    $(".dowJones3").css('color', '#32CD32');
  }
  

  $(".nasdaq").append(" ", response.majorIndexesList[1].indexName);
  $(".nasdaq2").append(" ", response.majorIndexesList[1].price);
  $(".nasdaq2").css('color', '#1E90FF');
  if (response.majorIndexesList[1].changes < 0) {
    $(".nasdaq3").append(" ", response.majorIndexesList[1].changes);
    $(".nasdaq3").css('color', '#FF0000');
  } else if (response.majorIndexesList[1].changes > 0) {
    $(".nasdaq3").append(" ", response.majorIndexesList[1].changes);
    $(".nasdaq3").css('color', '#32CD32');
  }

  $(".sp").append(" ", response.majorIndexesList[2].indexName);
  $(".sp2").append(" ", response.majorIndexesList[2].price);
  $(".sp2").css('color', '#1E90FF');
  if (response.majorIndexesList[2].changes < 0) {
    $(".sp3").append(" ", response.majorIndexesList[2].changes);
    $(".sp3").css('color', '#FF0000');
  } else if (response.majorIndexesList[2].changes > 0) {
    $(".sp3").append(" ", response.majorIndexesList[2].changes);
    $(".sp3").css('color', '#32CD32');
  }

  $(".cac").append(" ", response.majorIndexesList[3].indexName);
  $(".cac2").append(" ", response.majorIndexesList[3].price);
  $(".cac2").css('color', '#1E90FF');
  if (response.majorIndexesList[3].changes < 0) {
    $(".cac3").append(" ", response.majorIndexesList[3].changes);
    $(".cac3").css('color', '#FF0000');
  } else if (response.majorIndexesList[3].changes > 0) {
    $(".cac3").append(" ", response.majorIndexesList[3].changes);
    $(".cac3").css('color', '#32CD32');
  }
});

// Reset Form //
// ============================================= //  

function reset() {
  $(".from").val(" ");
  $(".to").val(" ");
  $(".amount").val(" ");
}