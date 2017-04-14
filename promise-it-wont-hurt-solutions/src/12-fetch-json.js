var HTTP = require("q-io/http");

var something = HTTP.read('http://localhost:1337')

something.then(function(something){
  console.log(JSON.parse(something))
})
