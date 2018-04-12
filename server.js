var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Reservations data
var reservations = [];
var waitlist = [];

// Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res){
    res.json(reservations);
    res.json(waitlist);
})

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// app.get("/api/characters/:character", function (req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);

// });

var customersCount = 0;

app.post("/reserve", function (req, res) {
  customers++;

  var newcustomer = req.body;

  newcustomer.routeName = newcustomer.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcustomer);

  if (customersCount < 6) {
    reservations.push(newcustomer);
  } else {
    waitlist.push(newcustomer);
  }

  res.json(newcustomer);
});


app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});