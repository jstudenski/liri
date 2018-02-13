var Word = require("./Word.js");
var clear = require('clear');
var color = require("../colors.js");


var Game = function(){ //word
  this.guessRemain = 10;
  this.guessed = [];
  this.incorrect = [];
  this.word = new Word('test three');
}

Game.prototype.logIncorrect = function() {
  if (this.incorrect != "") {
    color("yellow","Incorrect Guesses: ");
    console.log(this.incorrect.join(" ")+"\n");
  }
}


Game.prototype.guess = function(char) {

clear();

  if (this.guessed.indexOf(char) > -1) {
    color("pink", char+" has already been guessed\n");
  } else {
    this.guessed.push(char);
    if (this.word.guess(char)){
      color("green", char+" was "+"CORRECT!!"+"\n");
    } else {
      color("red", char+" was "+"INCORRECT!!"+"\n");
      this.incorrect.push(char);
      this.guessRemain--;
    };
  }

  this.word.display();
  color("orange","\n"+this.guessRemain + " guesses remaining"+"\n");
  this.logIncorrect();

}

module.exports = Game;