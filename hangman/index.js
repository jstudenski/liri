var Word = require("./Word.js");
var Game = require("./Game.js");
var inquirer = require('inquirer');

var myGame = '';
//var guessRemain = 0; 

function newGame(){
  myGame = new Game();
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
      console.log('Your guess was.. '+guess);

      // console.log(myWord.letters[0].letter);
myGame.guess(guess)
      // indexOf(guess)
     // console.log(myGame.guess(guess));


    //  console.log(myGame);
    //  console.log(myGame.word);


    //  myGame.word.display();
      // myWord.guess(guess);
      // myWord.display();

      // console.log(myWord);
      // console.log(myWord.guessRemain);
      guessLetter();
      // var choice = inquirerResponse.choice;
      // var response = inquirerResponse.response;
      // choiceSwitch(choice, response);
  });
}

newGame();