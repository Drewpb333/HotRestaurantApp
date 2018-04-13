var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

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

app.get("/api/tables", function (req, res) {
  console.log(reservations);
  res.json(reservations);
})

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

var customersCount = 0;

app.post("/api/reservations", function (req, res) {
  customersCount++;

  var newcustomer = req.body;

  newcustomer.routeName = newcustomer.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcustomer);
 
  reservations.push(newcustomer);

  res.json(newcustomer);
});


app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});