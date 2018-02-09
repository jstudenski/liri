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
var clear = require('clear');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


clear();

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

function mainMenu(){
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

mainMenu();

function choiceSwitch(choice, response) {
  switch (choice) {
    case 'Twitter':
      twitter(response);
     // console.log(response);
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



function twitter(num) {

  var params = { screen_name: 'jstudenski1', count: num };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        console.log("\x1b[38;5;236m" + tweets[i].created_at + "\x1b[0m");
        console.log(tweets[i].text);
      }

    }
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
        console.log(movieResponse.Plot);
        console.log(movieResponse.Actors); 



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

