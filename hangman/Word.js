var Letter = require("./Letter.js");

var Word = function(word){
  this.guessRemain = 10;
  this.letters = [];
  for (var x = 0; x < word.length; x++){
    this.letters.push(new Letter(word.charAt(x)));
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
  for (var x = 0; x < this.letters.length; x++){
    this.letters[x].makeGuess(char);
  }
}

module.exports = Word;
