
# LIRI
<img src="logo.png" alt="alt text" width="200">
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Installation
##### Install graphicsmagick
mac:
`$ brew install graphicsmagick`

http://www.graphicsmagick.org/

##### Install dependencies
`$ npm install`

##### Create .env file 
add Spotify and Twitter API keys

```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
```
## Usage
`$ node liri.js`