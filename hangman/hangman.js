var Word = require("./Word.js");
var Game = require("./Game.js");
var inquirer = require('inquirer');
var clear = require('clear');
var liri = require('../liri.js');
var fs = require("fs");

var myGame = '';
//var guessRemain = 0; 





var newGame = function newGame(){
  clear();

  fs.readFile("hangman/words.txt", "utf8", function(err, data) {
    if (err) return err;
      
      var split = data.split("\n");
      //var randomWord = 

      myGame = new Game(split[Math.floor(Math.random()*split.length)]);

      console.log("Guess a State Capital, Good Luck!\n");
      myGame.word.display();

      guessLetter();

    });
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
      console.log(inquirerResponse.option);
      switch (inquirerResponse.option) {
      case 'New Game':
        newGame();
        break;
      case 'Main Menu':
        liri.mainMenu();
        break;
      default:
        console.log("Unhandled Case!");
    }


    //   var guess = inquirerResponse.guess.toUpperCase();

    //   myGame.guess(guess) ? newGame() : guessLetter();

    });
}

module.exports = newGame;
