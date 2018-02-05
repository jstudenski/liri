require("dotenv").config();

var colors = require("./colors.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require('fs');
var keys = require('./keys.js');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

// We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

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

//console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');


  //  console.log(JSON.parse(body));

    // Then we print out the imdbRating
  //  console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  console.log('HELLO');  //yellow
  }

});

// for (var key in colors) { 
//   console.log(colors[key], 'Hello');
// }