var promise = new Promise(function(fulfill, reject){
  fulfill('PROMISE VALUE')
});

promise.then(console.log).then(console.log("MAIN PROGRAM"))
