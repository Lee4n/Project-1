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
var currencyArray;
var resultContainer = $("<div class='outputField'>");
var resultSymbol = $("<div class='newSymbol'>");
var resultAmount = $("<div class='newAmount'>");
var resultCountry = $("<div class='newCountry'>");
var selectedSymbol;
var symbols = [];

getData();

function getData() {

  // Currency Converter Country List //
  // ============================================= //

  $.ajax({
    url: "https://free.currconv.com/api/v7/currencies?apiKey=60e32d887b397ac6240b",
    method: "GET"
  }).then(function (response) {
    currencyArray = Object.values(response.results);
    currencyArray.map(ca => symbols.push(ca.id))
    console.log(symbols)
    populateSymbol()
  });
};

function setSymbol() {
  var to = $("#to").val();

  for (var i = 0; i < currencyArray.length; i++) {

    if (to === currencyArray[i].id) {
      selectedSymbol = currencyArray[i].currencySymbol;
      resultSymbol.append(selectedSymbol);
    }
  }

};

function populateSymbol() {
  console.log(symbols)
  var options = symbols.map(s => `<option value="${s}">${s}</option>`)
  $(".dropdown").append(options);
};

function empty() {
  resultSymbol.empty()
  resultAmount.empty()
  resultCountry.empty()
  resultContainer.empty()
}

$(".submit").on("click", function (event) {
  event.preventDefault();

  empty();

  var main = $("#resultsArea")

  var ccaKey = "60e32d887b397ac6240b";
  var from = $("#from").val();
  var to = $("#to").val();
  var amount = $("#amount").val()

  // console.log(from)
  // console.log(to)

  $.ajax({
    url: "https://free.currconv.com/api/v7/convert?q=" + from + "_" + to + "&compact=ultra&apiKey=" + ccaKey,
    method: "GET"
  }).then(function (response) {
    // console.log(" ");
    // console.log("-------------------------------");
    // console.log("Currency Converter API");
    // console.log("-------------------------------");
    // console.log(response);

    var test = Object.values(response)[0];
    var newRate = (amount * test).toFixed(2);


    // console.log(test)

    // console.log(to)
    // console.log(newRate)

    resultCountry.append(" ", to);
    resultAmount.append(" ", newRate);

  });

  setSymbol();

  resultContainer.append(amount + " " + from + " = ")
  resultContainer.append(resultSymbol);
  resultContainer.append(resultAmount);
  resultContainer.append(resultCountry);

  main.append(resultContainer)
  main.css('font-size', '30px')
  database.ref().push({
    amount: amount,
    to: to,
    symbol: selectedSymbol
  });

});

// Financial Modeling Prep API //
// ============================================= //  

$.ajax({
  url: "https://financialmodelingprep.com/api/v3/majors-indexes",
  method: "GET"
}).then(function (response) {
  // console.log(" ");
  // console.log("-------------------------------");
  // console.log("Financial Modeling Prep");
  // console.log("-------------------------------");
  // console.log(response);

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
  $("#from").val(" ");
  $("#to").val(" ");
  $("#amount").val(" ");
}