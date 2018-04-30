const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')


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

// request(opts, function (err, res, body) {
//     console.log('error', err);
//     console.log('status', res.statusCode);
//     console.log('body', body);
//     console.log('access_token', body.access_token)
// });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/token', (mainreq, mainres) => {
    console.log('hit tokens endpoint')
    if (access_token) {
        console.log('access token exists', message)
        mainres.status(200).send(message)
    } else {
        request(opts, function (err, res, body) {
            //console.log('error: ', err);
            console.log('status: ', res.statusCode);
            console.log('body: ', body);
            console.log('access_token: ', body['access_token'])
            access_token = body['access_token']
            message = {
                token: access_token
            }
            message = JSON.stringify(message);

            try {
                console.log("sending the first time: ", message)
                mainres.status(200).send(message) 
            } catch(error) {
                console.log("errored the first time: ", error)
            }
        });
    }
    
})

app.listen(3005)
