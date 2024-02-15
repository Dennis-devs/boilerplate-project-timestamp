// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use("public", express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
  //res.json({"unix":1451001600000, utc:"Fri, 25 Dec 2015 00:00:00 GMT"})
});

/*app.get("/api/:date?", function (req, res){
  res.json({"unix": Number})
})
app.get("/api/:date?", function (req, res){
  res.json({"unix": String})
})*/

app.get("/api/:date?", function (req, res){
  let date = req.params.date;
  let unix = 0;
  let utc = "";
  let dateObj = new Date(date);
  if(dateObj.toString() === "Invalid Date"){
    dateObj = new Date(Number(date));
    if(dateObj.toString() === "Invalid Date"){
      res.json({"error":"Invalid Date"});
    }else{
      unix = dateObj.getTime();
      utc = dateObj.toUTCString();
      res.json({"unix": unix, "utc": utc});
    }
  }else{
    unix = dateObj.getTime();
    utc = dateObj.toUTCString();
    res.json({"unix": unix, "utc": utc});
  }
});

/*app.get("/api", (req, res) =>{
  unix = new Date().getTime();
  utc = new Date().toUTCString();
  res.json({"unix": unix, "utc": utc});
})*/

/*app.get("/api/:date?", (req, res) => {
    if (!req.params.date) {
        const unix = Date.now()
        const utc = new Date(unix).toUTCString()
        res.send({ unix, utc })
    } else if (!isNaN(req.params.date)) {
        const unix = parseInt(req.params.date)
        const utc = new Date(unix).toUTCString()
        res.send({ unix, utc })
    } else {
        const utc = new Date(req.params.date).toUTCString()

        if (utc.toLowerCase() == "invalid date") {
            res.send({ error: "Invalid Date" })
        } else {
            const unix = Date.parse(utc)
            res.send({ unix, utc})
        }
    }
})*/

/*app.get("/api/:date?", function (req, res){
  res.json({"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"})
})
app.get("/api/1451001600000", function (req, res){
  res.json({"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"})
})*/
/*app.get("/freecodecamp", function (req, res){
  res.redirect('http://freecodecamp.org')
})*/


// your first API endpoint... 
/*app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});*/



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
