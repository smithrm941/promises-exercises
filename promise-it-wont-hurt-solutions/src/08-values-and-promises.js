function attachTitle (argument){
  return 'DR. ' + argument;
};

Promise.resolve("MANHATTAN").then(attachTitle).then(console.log)
