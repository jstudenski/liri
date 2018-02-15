var Word = require("./Word.js");
var Game = require("./Game.js");
var inquirer = require('inquirer');
var clear = require('clear');

var myGame = '';
//var guessRemain = 0; 

var newGame = function newGame(){
  clear();
  myGame = new Game();
  console.log("Good Luck!\n");
  myGame.word.display();

  //guessRemain = 10;
  guessLetter();

}

function guessLetter(){
  inquirer.prompt([
    {
      type: "text",
      message: "Guess a Letter:",
      name: "guess",
      validate: function(value) {
        var range = /[a-zA-Z]+/;
        if (value.length > 1) {
          return "Too many characters!";
        }
        else if (value.match(range)) {
          return true;
        }
        else {
          return "That is not a valid letter!";
        }
      }
    }
  ]).then(function(inquirerResponse) {
    var guess = inquirerResponse.guess.toUpperCase();

    myGame.guess(guess) ? endGameMenu() : guessLetter();

  });
}

function endGameMenu(){

  inquirer.prompt([
      {
      type: "list",
      message: "Options:",
      choices: [
        "New Game",
        "Main Menu"
        ],
      name: "option"
    }
    ]).then(function(inquirerResponse) {


      //console.log();
      switch (inquirerResponse.choice) {
      case 'New Game':
        newGame();
        break;
      case 'Main Menu':
        //twitter(response);
        break;
      default:
        console.log("Unhandled Case!");
    }


    //   var guess = inquirerResponse.guess.toUpperCase();

    //   myGame.guess(guess) ? newGame() : guessLetter();

    });
}

module.exports = newGame;