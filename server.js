const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3005


let app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())
// app.use(logger('dev'))
// app.use(errorhandler())


const request = require('request');
const payload = process.env.KEY1 + ":" + process.env.KEY2;
const encodedPayload = new Buffer(payload).toString("base64");


let access_token = null;
let timeOfTokenCreation = null;
let message = null;

const opts = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + encodedPayload
    },
    body: "grant_type=client_credentials&scope=playlist-modify-public playlist-modify-private",
    json: true
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/token', (mainreq, mainres) => {
    console.log(' ');
    const currentTime = Date.now()

    if (!timeOfTokenCreation) {
        timeOfTokenCreation = Date.now()
    }

    const tokenAgeInMinutes = Math.floor((Date.now() - timeOfTokenCreation)/60000)

    console.log('tokenAgeInMinutes', tokenAgeInMinutes)
    console.log(Date.now())

    /* 
        these spotify tokens expire every hour, so we need to refresh them.
        To be safe, we won't send a token to the client 
        if the token is more than 45 minutes old 
    */
    if (access_token && tokenAgeInMinutes < 45) {
        console.log(tokenAgeInMinutes)
        
        message.token_age_minutes = tokenAgeInMinutes
        console.log('didnt refresh token: ', message);
        mainres.status(200).send(JSON.stringify(message))
    } else {
        timeOfTokenCreation = Date.now()
        request(opts, function (err, res, body) {
            access_token = body['access_token']
            message = {
                token: access_token,
                expires_in: body['expires_in'],
                token_age_minutes: tokenAgeInMinutes
            }
            //message = JSON.stringify(message);
            console.log('refreshing token: ', message);
            try {
                mainres.status(200).send(JSON.stringify(message)) 
            } catch(error) {
                console.log("errored the first time: ", error)
            }
        });
    }
    
})

app.listen(PORT)
