var assert = require('assert');
var passcomplex = require('../index.js')

describe('Password Complexity', function() {
  this.timeout(120000);

  it ('should fail if the password is less than 8 characters', function(done){
    passcomplex('user', '$aS1').then(function(retVal){
      //console.log(retVal.messages)
      assert.equal(retVal.valid, false);
      done()
    })

  })

  it ('should not contain your username', function(done){
    passcomplex('userName', '$$userName$$').then(function(retVal){
      //console.log(retVal.messages)
      assert.equal(retVal.valid, false)
      done();
    })
  })

  it ('should be different from your current password', function(done){
    passcomplex('userName', 'CuRentPassword$$', 'CuRentPassword$$').then(function(retVal){
      //console.log(retVal.messages)
      assert.equal(retVal.valid, false)
      done();
    })
  })

  it ('should not be the reverse of your username', function(done){
    passcomplex('userName$', '$emaNresu').then(function(retVal){
      //console.log(retVal.messages)
      assert.equal(retVal.valid, false)
      done();
    })
  })

  it ('It must contain characters from at least two different character classes (upper- and lower-case letters, letters and symbols, letters and numbers, etc.)', function(done){
    passcomplex('username', 'emaNresu').then(function(retVal){
      //console.log(retVal.messages)
      assert.equal(retVal.valid, false)
      done();
    })
  })

  it ('must be comprised of the Roman Alphabet or symbols on the keyboard', function(done){
    passcomplex('userName$', '$2asdfjfFū').then(function(retVal){
      //console.log(retVal.messages)
      assert.equal(retVal.valid, false)
      done();
    })
  })

  it('should return false if password is in wordlist', function(done) {
    passcomplex('user', 'passworD$$').then(function (retVal){
      ////console.log(retVal.messages)
      assert.equal(retVal.valid, false);
      done();
    })
  });

  it ('should return true if password is NOT in the wordlist', function(done){
    passcomplex('user', '(S*DF&Skdl2122)').then(function (retVal){
      assert.equal(retVal.valid, true);
      done()
    }, function(ex){
      //console.error(ex);
      done();
    })
  })
});
