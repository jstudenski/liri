var Letter = function(char){
  this.letter = char;
  this.guessed = false;
  if (char === " ") this.guessed = true;
}

Letter.prototype.toString = function() {
  return(this.guessed === true) ? this.letter : "_";
}

Letter.prototype.makeGuess = function(guess){
  if (guess === this.letter) {
    this.guessed = true; 
    return true;
  }
}

module.exports = Letter;