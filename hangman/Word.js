var Letter = require("./Letter.js");

var Word = function(word){
  this.letters = [];
  for (var x = 0; x < word.length; x++){
    this.letters.push(new Letter(word.charAt(x).toUpperCase()));
  };
}

Word.prototype.display = function() {
  var show = ""
  for (var x = 0; x < this.letters.length; x++){
    show = show.concat(this.letters[x]+' ')
  }
  console.log(show);
}

Word.prototype.guess = function(char) {
 var found = false;
  for (var x = 0; x < this.letters.length; x++){
    if (this.letters[x].makeGuess(char)) found = true;
  }
  return found;
}

Word.prototype.checkWin = function() {
  for (var x = 0; x < this.letters.length; x++){
    if (this.letters[x].guessed === false) {
      return false;
    } 
  }
  return true
}


module.exports = Word;
