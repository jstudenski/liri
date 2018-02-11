var Letter = function(char){
  this.letter = char;
  this.guessed = false;
  this.output = function(){
    if (this.guessed === true){
      console.log(this.letter);
    } else {
      console.log("_");
    }
  };
  this.makeGuess = function(guess){
    if (guess === this.letter){
      this.guessed = true;
    }
  };
}

// var test = new Letter('a');

// console.log(test.guessed);
// console.log(test.makeGuess('a'));
// console.log(test.guessed);

// test.output();

module.exports = Letter;