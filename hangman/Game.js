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

  color("orange","Incorrect Guesses: ");
  console.log(this.incorrect.join(" "));
  }
}


Game.prototype.guess = function(char) {

clear();

  if (this.guessed.indexOf(char) > -1) {
    console.log("Letter has already been guessed: "+char);
  } else {
    this.guessed.push(char);
    if (this.word.guess(char)){
      color("green", char+" was "+"CORRECT!!");
    } else {
      color("red", char+" was "+"INCORRECT!!");
      this.incorrect.push(char);
      this.guessRemain--;
    };

    this.word.display();
    console.log(this.guessRemain + " guesses remaining");
   // color("red", "test");
    this.logIncorrect();
    console.log();
   //  color("blue", "test");
  }


}

module.exports = Game;