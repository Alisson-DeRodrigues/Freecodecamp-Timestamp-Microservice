// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  try {
    if (req.params.date === undefined) { // If no date is provided, use the current date
      req.date = new Date();
    }
    else if (!isNaN(req.params.date)) {
      req.date = new Date(parseInt(req.params.date));  // If the date is a number, convert it to a Date object
    } else {
      req.date = new Date(req.params.date) // Otherwise, assume the date is a string (like type 2025-01-01) and convert it to a Date object
    }
    res.json({ unix: req.date.getTime(), utc: req.date.toUTCString()});
  } catch {
    res.json({ error: "Invalid Date" }); // If the date cannot be converted to a valid format, return an error.
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
