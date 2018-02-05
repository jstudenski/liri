require("dotenv").config();

var colors = require("./colors.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require('fs');
var keys = require('./keys.js');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// get user input
var param = process.argv[2];
switch (param) {
  case 'help':


    console.log(logo());
    


    console.log(colors.FgGreen+'Options:'+colors.Reset);
    console.log('  my-tweets');  
    console.log(colors.Dim+'  This will show your last 20 tweets and when they were created'+colors.Reset); 
    console.log('  spotify-this-song \'<song name here>\'');  
    console.log(colors.Dim+'  This will show the various information about a song'+colors.Reset); 
    console.log('  movie-this \'<movie name here>\'');
    console.log(colors.Dim+'  This will output various information about a movie'+colors.Reset);     
    console.log('  do-what-it-says');  
    console.log(colors.Dim+'  This will call a command from inside of random.txt'+colors.Reset);  
    break;
  case 'my-tweets':


    break;
  case 'spotify-this-song':

    break;
  case 'movie-this':
    var movieName = process.argv[3];
    movieThis(movieName);
    break;
  case 'do-what-it-says':

    break;
  default:
    console.log(colors.FgRed+'Invalid parameter:'+colors.Reset);
    console.log('Try: \'node liri.js help\' to see avaliable options.');    
}

//console.log(result)


// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

// We then run the request module on a URL with a JSON


function movieThis(name){
  var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {
      console.log("--------------------------------");
      console.log(colors.BgCyan);

      console.log("Title: "+JSON.parse(body).Title);

      console.log("Year released: "+JSON.parse(body).Year);
      console.log("IMDB Rating: "+JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value);

      console.log(JSON.parse(body).Country);
      console.log(JSON.parse(body).Language);
      console.log(JSON.parse(body).Plot);
      console.log(JSON.parse(body).Actors); 

      console.log(colors.Reset);
      console.log("--------------------------------");
    }

  });
}


function logo() {
  var color1 = colors.FgMagenta;
  var color2 = colors.FgRed;
  var color3 = colors.FgYellow;
  var color4 = colors.FgCyan;
  return  color1+' ___ '+color2+'      ___ '+color3+' ________ '+color4+' ___  '+ '\n' +    
          color1+'|\\  \\  '+color2+'   |\\  \\'+color3+'|\\   __  \\'+color4+'|\\  \\ '+ '\n' +    
          color1+'\\ \\  \\ '+color2+'   \\ \\  \\'+color3+' \\  \\|\\  \\ '+color4+'\\  \\  '+ '\n' +  
          color1+' \\ \\  \\ '+color2+'   \\ \\  \\'+color3+' \\   _  _\\ '+color4+'\\  \\  '+ '\n' + 
          color1+'  \\ \\  \\____'+color2+'\\ \\  \\ '+color3+'\\  \\\\  \\\\ '+color4+'\\  \\ '+ '\n' + 
          color1+'   \\ \\_______\\'+color2+' \\__\\ '+color3+'\\__\\\\ _\\\\'+color4+' \\__\\ '+ '\n' + 
          color1+'    \\|_______|'+color2+'\\|__|'+color3+'\\|__|\\|__|'+color4+'\\|__|'+colors.Reset;
}
