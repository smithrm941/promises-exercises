var HTTP = require("q-io/http");


var something = HTTP.read('http://localhost:7000')

something.then(function(id){
  var otherThing = HTTP.read('http://localhost:7001/' + id)
}).then(function(otherThing){
  console.log(JSON.parse(otherThing))
})
