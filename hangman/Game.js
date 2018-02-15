var Word = require("./Word.js");
var clear = require('clear');
var color = require("../colors.js");


var Game = function(){ //word
  this.guessRemain = 8;
  this.guessed = [];
  this.incorrect = [];
  this.word = new Word('qwer');
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
  // log incorrect
  if (this.incorrect != "") {
    color("yellow","Incorrect Guesses: ");
    console.log(this.incorrect.join(" ")+"\n");
  }

  if (this.word.checkWin()) {
    clear();
    color("green","you win!\n");
    this.word.display();
    console.log();
    return true;
  }

  if (this.guessRemain === 0) {
    clear();
    color("red","you lose!\n");
    this.word.display();
    console.log();
    return true;
  }

}

module.exports = Game;