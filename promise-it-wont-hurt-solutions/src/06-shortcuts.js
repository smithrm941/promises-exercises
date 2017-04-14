var promise = Promise.resolve('PROMISE VALUE')
var promiseReject = Promise.reject(new Error('THE BIGGEST ERROR, THE BEST'))
promise.catch(function(err){
  console.error('This is ALL wrong.')
  console.error(err.message)
})
