var Letter = function(char){
  this.letter = char;
  this.guessed = false;
}

Letter.prototype.toString = function() {
  if (this.guessed === true){
    return this.letter;
  } else {
    return "_";
  }
}

Letter.prototype.makeGuess = function(guess){
  if (guess === this.letter){
    this.guessed = true;
  }
}

module.exports = Letter;