'use strict';

function ajax (method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var requestAPI = JSON.parse(xhr.response);
        callback(requestAPI);
      }
    });
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  }

  function appendTable(result){
    var table = document.querySelector('table');
    table.innerHTML = `<thead>
                        <th>PLATE</th>
                        <th>CAR BRAND</th> 
                        <th>CAR MODEL</th>
                        <th>COLOR</th>
                        <th>YEAR</th>
                      </thead>
    `
    result.result.forEach(function(element) {
      const markup = `<tr>
                        <td>${element.plate}</td>
                        <td>${element.car_brand}</td>
                        <td>${element.car_model}</td>
                        <td>${element.color}</td>
                        <td>${element.year}</td>
                      </tr>
      `
      table.innerHTML += markup;
    }, this);
  }

  var button = document.querySelector('button');
  var plate = document.querySelector('input');
  button.addEventListener('click', function () {
    var url = 'http://localhost:3000/search?plate=';
    url += plate.value;
    ajax('GET', url, null, appendTable)
  });
  
//   button.addEventListener('click', function(plate) {
//       if (document.querySelector('input') < 7) {
//           window.alert("input must be less then 7 digits")
//       }
//   });

//   checkInput(plate);

  ajax('GET', 'http://localhost:3000/search', null, appendTable)

