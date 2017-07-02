var path = require('path');
var db = require('pouchDb')('password')

module.exports = function (user, password, currentPassword){
  if (!user || !password) throw new Exception("You must pass both user and password")
  password = password.trim();
  var valid = true;
  var messages= [];

  function reverse(s) {
    return s.split('').reverse().join('');
  }
  function containAtTwoCharacterClasses(password){
    var classCount =0;
    if (/[a-z]+/.test(password)) classCount++;
    if (/[A-Z]+/.test(password)) classCount++;
    if (/[0-9]+/.test(password)) classCount++;
    if (/[!@#$%^&*()\-+{}\[\]|?:;<>,.?\/`~]+/.test(password)) classCount++;

    return classCount > 2;
  }

  function containsNonRomanCharactersOrSymbols(password){
    return !(/^[a-zA-Z0-9!@#$%^&*()\-+{}\[\]|?:;<>,.\/`~]+$/.test(password))
  }

  function isInWordList(password){
    var found = false;
    return db.get(password).then(x => {
      return !!x;
    })
  }

    if (password.length <= 8){
      valid = false;
      messages.push('Password must be 8 characters or longer.');
    }

    if (password.indexOf(user) > -1){
      valid = false;
      messages.push('Password must not contain your username.');
    }

    if (password === currentPassword){
      valid = false;
      messages.push('Password must be different from your current password');
    }

    if (password === reverse(user)){
      valid = false;
      messages.push('Password cannot be the reverse of your username');
    }

    if (!containAtTwoCharacterClasses(password)){
      valid = false;
      messages.push('Password must contain characters from at least two different character classes (upper- and lower-case letters, letters and symbols, letters and numbers, etc.)')
    }

    if (containsNonRomanCharactersOrSymbols(password)){
      valid = false;
      messages.push('Password must not contain non-Roman characters or symbols that are not on the keyboard');
    }
  if (!valid){
    let promise =  new Promise(function(resolve){
      resolve({valid:valid, messages:messages});
    })
    return promise;
  }
  return isInWordList(password).then(function(wordlist){
      valid &= !wordlist
      if (wordlist)
        messages.push('Password happens to be in a list of cracked passwords.  Please choose another.');
    return {valid:valid, messages:messages};
  })
  // .catch(function(){
  //   //Unexpected failure guess we let it through?
  //   return {valid:true, messages:messages};
  // });
}
