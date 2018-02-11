var Letter = require("./Letter.js");


// var Word = function(word){
//   this.letters = [];
//   this.addLetters = function(word){
//     for (var x = 0; x < word.length; x++){
//       this.letters.push(new Letter(word.charAt(x)));
//     }
//   };
//   this.userDisplay = function(){
//     for (var x = 0; x < this.letters.length; x++){
//       this.letters[x].output();
//     }
//   };
//   this.guessLetter = function(char){
//     for (var x = 0; x < this.letters.length; x++){
//       this.letters[x].makeGuess(char);
//     }
//   }
// }
// function parseWord(word) {
//   for (var x = 0; x < word.length; x++){
//     this.push(new Letter(word.charAt(x)));
//   }
// }

var Word = function(word){
  this.letters = [];
  for (var x = 0; x < word.length; x++){
    this.letters.push(new Letter(word.charAt(x)));
  };
  this.userDisplay = function(){
    for (var x = 0; x < this.letters.length; x++){
      this.letters[x].output();
    }
  };
  this.guessLetter = function(char){
    for (var x = 0; x < this.letters.length; x++){
      this.letters[x].makeGuess(char);
    }
  }
}

var myWord = new Word('test');


console.log(myWord.letters);

myWord.userDisplay();
myWord.guessLetter('t');
myWord.userDisplay();
myWord.guessLetter('s');
myWord.userDisplay();
//console.log()

module.exports = Word;





// var Word = function(word){
//   this.letters = function(){
//     for (var x = 0; x < word.length; x++){
//       return new Letter(word.charAt(x));
//     }
//   };
//   this.userDisplay = function(){
//     for (var x = 0; x < this.letters.length; x++){
//       this.letters[x].output();
//     }
//   };
//   this.guessLetter = function(char){
//     for (var x = 0; x < this.letters.length; x++){
//       this.letters[x].makeGuess(char);
//     }
//   }
// }
