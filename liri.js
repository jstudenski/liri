require("dotenv").config();


var logo = require("./logo.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require('fs');
var keys = require('./keys.js');
var imageToAscii = require("image-to-ascii");
var inquirer = require('inquirer');
var stripAnsi = require('strip-ansi');
var clear = require('clear');
var hangman = require("./hangman/hangman.js");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

clear();

console.log(logo());

var mainMenu = function(){

//var mainMenu = function(){
inquirer.prompt([
    {
      type: "list",
      message: "Program:",
      choices: [
        "\x1b[38;5;197mHangman\x1b[0m",
        "\x1b[38;5;39mTwitter\x1b[0m",
        "\x1b[38;5;46mSpotify\x1b[0m",
        "\x1b[38;5;196mMovie\x1b[0m",
        "\x1b[38;5;208mRead File\x1b[0m",
        "\x1b[38;5;220mWeather\x1b[0m"
        ],
      name: "choice",
      filter: function (str){
        return stripAnsi(str);
      }
    },
    {
      name: 'response',
      message: 'How many tweets? (1-20)',
      when: function(answers){
        return answers.choice === 'Twitter';
      }
    },
     {
      name: 'response',
      message: 'Song Name:',
      when: function(answers){
        return answers.choice === 'Spotify';
      }
    }, {
      name: 'response',
      message: 'Movie Title:',
      when: function(answers){
        return answers.choice === 'Movie';
    }
    }])

  .then(function(inquirerResponse) {
    var choice = inquirerResponse.choice;
    var response = inquirerResponse.response;
    choiceSwitch(choice, response);
  });
}


var methods = {
  timestamp: function() {
    console.log('Current Time in Unix Timestamp: ' + Math.floor(Date.now() / 1000));
  },
  currentDate: function() {
    console.log('Current Date is: ' + new Date().toISOString().slice(0, 10));
  }
};
exports.data = methods;

module.exports.mainMenu = mainMenu;


mainMenu();

function choiceSwitch(choice, response) {
  switch (choice) {
    case 'Hangman':
      hangman();
      break;
    case 'Twitter':
      twitter(response);
      break;
    case 'Spotify':
      spotifyThis(response);
      break;
    case 'Movie':
      movieThis(response)
      break;
    case 'Read File':
      readFile();
      break;
    case 'Weather':
      console.log("Feature Coming Soon");
      mainMenu();
      break;
    default:
      console.log("Unhandled Case!");
  }
}



function twitter(num) {
  
  console.log("\x1b[38;5;214m" + "Displaying tweets from: " + "\x1b[0m" + "\x1b[38;5;76m"+ "jstudenski1" +"\x1b[0m");

  var params = { screen_name: 'jstudenski1', count: num };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        colorText(236, tweets[i].created_at);
        console.log(tweets[i].text);
      }

    }
    mainMenu();
  });

};




function readFile() {
  //console.log("reading file 'random.txt'");
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }

    var array = data.split(",");
    choiceSwitch(array[0], array[1])

  });
}


var song = function(artist, song, album, preview) {
  this.artist = artist;
  this.song = song;
  this.album = album;
  this.preview = preview;  
}

function spotifyThis(name) {
  // if no song is provided
  if (name == "") {
    name = 'The Sign';
    colorText(160, "You didn\'t pick a song."); 
    console.log("\x1b[38;5;214m" + "lets use: " + "\x1b[0m" + "\x1b[38;5;76m"+ name +"\x1b[0m");
  }


spotify.search({ type: 'track', query: name, limit: '10'}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
  var songResponse = data.tracks.items;

  var songArray = []
  var titleArray = []

  for (var i = 0; i < songResponse.length; i++) {
    if (songResponse[i] != undefined) {

        var newSong = new song(
        songResponse[i].artists[0].name,
        songResponse[i].name,
        songResponse[i].album.name,
        songResponse[i].preview_url);
  
        songArray.push(newSong);

        titleArray.push(songResponse[i].name);

    }
  }

  inquirer.prompt([
    {
      type: "list",
      message: "Song:",
      choices: titleArray,
      name: "choice",
      filter: function (str){
        return stripAnsi(str);
      }
    }])
  .then(function(inquirerResponse) {

    for (var i = 0; i < songResponse.length; i++) {
      if (songArray[i].song === inquirerResponse.choice) {
     // console.log("Song: "+ songArray[i].song);
        console.log("Artists: "+songArray[i].artist);
        console.log("Album: "+songArray[i].album);
        console.log("Preview Link: "+"\x1b[38;5;4m"+ songArray[i].preview +"\x1b[0m");
        break; // only return once song
      }
    }
  mainMenu();
  });



});

}


function movieThis(name){

  if (name == "") {
    name = 'Mr. Nobody';
    colorText(160, "You didn\'t pick a movie.");
    colorText(214, "lets use: "+name);

   // console.log("\x1b[38;5;214m" + "lets use: " + "\x1b[0m" + "\x1b[38;5;76m"+ name +"\x1b[0m");
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
    
      var movieResponse = JSON.parse(body);

      if (movieResponse.Response === 'False'){

        colorText(160, "Movie not found");
        mainMenu();
      } else {

        // var movieResponse = JSON.parse(body);
        colorText(226, "Title: "+movieResponse.Title);
        
       // console.log("Title: "+movieResponse.Title);

        console.log("Released: "+movieResponse.Year);
        console.log("IMDB Rating: "+movieResponse.imdbRating);

        for (var i = 0; i < movieResponse.Ratings.length; i++) {
          if (movieResponse.Ratings[i].Source === 'Rotten Tomatoes') {
            console.log("Rotten Tomatoes Rating: "+movieResponse.Ratings[i].Value);
          }
        }

        console.log(movieResponse.Country);
        console.log(movieResponse.Language);

        colorText(122, movieResponse.Plot)
        colorText(105, movieResponse.Actors)
       // console.log(movieResponse.Plot);
       // console.log(); 


          inquirer.prompt([
            {
              type: "confirm",
              message: "Show movie poster?",
              name: "confirm",
              default: "true"
            }])
            .then(function(inquirerResponse) {

              if (inquirerResponse.confirm){
                imageToAscii(movieResponse.Poster, {
                  colored: true,       
                  size: {
                    height: 50
                  },
                }, (err, converted) => {
                  console.log(err || converted);
                  mainMenu();
                });
              } else {
                mainMenu();
              }
            });

      }
    }
  });
}


function colorText(num, text) {
  console.log("\x1b[38;5;"+num+"m" + text + "\x1b[0m");
}



