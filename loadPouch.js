var db = require('pouchDb')('password');
let path = require('path')

var promise = new Promise(function(resolve, reject){

  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(path.join(__dirname ,'word-list.txt'))
  });

  lineReader.on('line', function (line) {
    if (!line) return;
    console.log(line)
    db.put({_id: line}).then(function(){
      console.log("Wrote " + line);
    }).catch(function(err){
      console.error(err);
    })
  });
  lineReader.on('close', function(){
    console.log('Finished')
    resolve();
  })

})
