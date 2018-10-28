// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  var date;
  var timestamp_json;
  
  if (req.params.date_string) {
    if (
      // date can be parsed as string, or
      ((date = new Date(req.params.date_string)) && !isNaN(date)) ||
      // date can be parsed as unix timestamp in ms
      ((date = new Date(parseInt(req.params.date_string)*1000)) && !isNaN(date))
       ) {
      timestamp_json = {unix: date.getTime(), utc: date.toUTCString()};
    } else {
      timestamp_json = {"error": "Invalid Date"};
    }
  } else {  // param is empty so use current date
    date = new Date();
    timestamp_json = {unix: date.getTime(), utc: date.toUTCString()};
  }
  
  res.json(timestamp_json);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});