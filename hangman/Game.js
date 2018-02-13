var Word = require("./Word.js");

var Game = function(){ //word
  this.guessRemain = 10;
  this.incorrectGuess = [];
  this.correctGuess = [];
  this.word = new Word('test three');
}

Game.prototype.guess = function(char) {
  if (this.word.guess(char)){
    console.log("FOUND!! "+char);
    this.correctGuess.push(char);
  } else {
    console.log("NOT FOUND!! "+char);
    this.incorrectGuess.push(char);
    this.guessRemain--;
  };
}

module.exports = Game;