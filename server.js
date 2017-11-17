'use strict';

var express = require('express');
var mysql = require('mysql');

var app = express();
app.use('/assets', express.static('./assets'));
app.use(express.json());

var connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: 'root',
  database: 'license_plates'
});
connection.connect();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/assets/index.html')
})

app.get('/search', function(req, res) {
  var data = [];
  if (req.query.plate) {
    var queryString = `SELECT * FROM licence_plates
    WHERE plate LIKE '%${req.query.plate}%'`;
  } else {
  var queryString = `SELECT * FROM licence_plates`;
  }
  connection.query(queryString, function(err, result, fileds) {
      result.forEach(function(element){
        data.push({'plate': element.plate, 'car_brand': element.car_brand, 'car_model': element.car_model, 'color': element.color, 'year': element.year})
      });
      res.send({'result': data});
  });
});

app.listen(3000, () => console.log("server running"));