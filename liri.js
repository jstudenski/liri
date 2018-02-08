require("dotenv").config();

var colors = require("./colors.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require('fs');
var keys = require('./keys.js');
var imageToAscii = require("image-to-ascii");
var inquirer = require('inquirer');
var stripAnsi = require('strip-ansi');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(keys.twitter)

function logo() {
  // get random color
  var color1 = "\x1b[38;5;"+Math.floor((Math.random() * 250) + 1)+"m";
  var color2 = "\x1b[38;5;"+Math.floor((Math.random() * 250) + 1)+"m";
  var color3 = "\x1b[38;5;"+Math.floor((Math.random() * 250) + 1)+"m";
  var color4 = "\x1b[38;5;"+Math.floor((Math.random() * 250) + 1)+"m";
  // create logo
  return(
    color1+' ___ '+color2+'      ___ '+color3+' ________ '+color4+' ___  '+ '\n' +    
    color1+'|\\  \\  '+color2+'   |\\  \\'+color3+'|\\   __  \\'+color4+'|\\  \\ '+ '\n' +    
    color1+'\\ \\  \\ '+color2+'   \\ \\  \\'+color3+' \\  \\|\\  \\ '+color4+'\\  \\  '+ '\n' +  
    color1+' \\ \\  \\ '+color2+'   \\ \\  \\'+color3+' \\   _  _\\ '+color4+'\\  \\  '+ '\n' + 
    color1+'  \\ \\  \\____'+color2+'\\ \\  \\ '+color3+'\\  \\\\  \\'+color4+'\\ \\  \\ '+ '\n' + 
    color1+'   \\ \\_______\\'+color2+' \\__\\ '+color3+'\\__\\\\ _\\'+color4+'\\ \\__\\ '+ '\n' + 
    color1+'    \\|_______|'+color2+'\\|__|'+color3+'\\|__|\\|__|'+color4+'\\|__|'+colors.Reset
  );
}

console.log(logo());

inquirer.prompt([
    {
      type: "list",
      message: "Program:",
      choices: [
        "\x1b[38;5;33mTwitter\x1b[0m",
        "\x1b[38;5;76mSpotify\x1b[0m",
        "\x1b[38;5;226mMovie\x1b[0m",
        "\x1b[38;5;210mRead File\x1b[0m"
        ],
      name: "choice",
      filter: function (str){
        return stripAnsi(str);
      }

    },{
      name: 'response',
      message: 'Twitter Question?',
      when: function(answers){
        return answers.choice === 'Twitter';
      }
    }, {
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

    // console.log("Choice: " + );
    // console.log("Choice: " + );
    //var param = inquirerResponse.choice;

    choiceSwitch(choice, response);

  });


function choiceSwitch(choice, response) {

    switch (choice) {
      case 'Twitter':
        console.log(response);
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

      default:
        console.log("Unhandled Case!");
    }


}


function readFile() {
  console.log("reading file 'random.txt'");

  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);

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
      console.log("\x1b[38;5;160m" + "You didn\'t pick a song." + "\x1b[0m");  
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

  });



});

}



function movieThis(name){


  if (name == "") {
    name = 'Mr. Nobody';
    console.log("\x1b[38;5;160m" + "You didn\'t pick a movie." + "\x1b[0m");  
    console.log("\x1b[38;5;214m" + "lets use: " + "\x1b[0m" + "\x1b[38;5;76m"+ name +"\x1b[0m");
  }



  var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
    
      var movieResponse = JSON.parse(body);

      if (movieResponse.Response === 'False'){

        console.log("\x1b[38;5;160m" + "Movie not found" + "\x1b[0m");

      } else {

        var movieResponse = JSON.parse(body);
        
        console.log("Title: "+movieResponse.Title);

        console.log("Released: "+movieResponse.Year);
        console.log("IMDB Rating: "+movieResponse.imdbRating);

        for (var i = 0; i < movieResponse.Ratings.length; i++) {
          if (movieResponse.Ratings[i].Source === 'Rotten Tomatoes') {
            console.log("Rotten Tomatoes Rating: "+movieResponse.Ratings[i].Value);
          }
        }

        // var posterURL = movieResponse.Poster;

        // imageToAscii(posterURL, {
        //   colored: true,       
        //   size: {
        //     height: 50
        //   },
        // }, (err, converted) => {
        //   console.log(err || converted);

        // });

       // console.log(colors.BgCyan);

      //  console.log("Rotten Tomatoes Rating: "+movieResponse.Ratings);

        console.log(movieResponse.Country);
        console.log(movieResponse.Language);
        console.log(movieResponse.Plot);
        console.log(movieResponse.Actors); 
       // console.log(colors.Reset);
      }
    }
  });
}


