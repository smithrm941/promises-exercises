'use strict'

function parsePromised(data){
 return new Promise(function(fulfill, reject){
   try {
     fulfill(JSON.parse(data));
   } catch (e) {
     reject(e);
   }
 })
}

parsePromised(process.argv[2])
.then(null, console.log) 
