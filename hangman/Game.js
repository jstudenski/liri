var Word = require("./Word.js");

var Game = function(){ //word
  this.guessRemain = 10;
  this.guessed = [];
  this.incorrect = [];
  this.word = new Word('test three');
}

Game.prototype.guess = function(char) {
  if (this.guessed.indexOf(char) > -1) {
    console.log("Letter has already been guessed: "+char);
  } else {
    this.guessed.push(char);
    if (this.word.guess(char)){
      console.log("CORRECT!!");
    } else {
      console.log("INCORRECT!!");
      this.incorrect.push(char);
      this.guessRemain--;
    };

    this.word.display();
    console.log(this.guessRemain + " guesses remaining");

  }


}

module.exports = Game;