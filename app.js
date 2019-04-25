// Sets up express and other required dependencies
const express = require('express');
const fetch = require('node-fetch');
var bodyParser = require('body-parser');
var fs = require('fs');
const app = express();
app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Removes CORS errors
app.use(function(req, resp, next) {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Function which gets a random integer between min and max (The maximum is exclusive and the minimum is inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Services GET requests for random flags and countries
app.get('/randflag', async function(req, resp){
    // Fetches a complete list of countries from countryapi, an external web service
    let response = await fetch('http://countryapi.gear.host/v1/Country/getCountries');
    // Processes the response
    let body = await response.text();
    let data = JSON.parse(body);
    // Obtains a random number
    let rand = getRandomInt(0,250);
    // Uses the random number to obtain a link to the flag of a random country
    let flagurl = data.Response[rand].FlagPng;
    // Records the name of that country
    let countryname = data.Response[rand].Name;
    // Initialises array to send
    let send = [];
    send.push(flagurl);
    // Initialises options and numbers array
    let options = [];
    let numbers = [];
    options.push(countryname);
    numbers.push(rand);
    // Runs process to obtain 3 different random numbers
    for (let i=0; i < 3; i++) {
        // Generates random number
        let random = getRandomInt(0,250);
        let check = i;
        let arraylength = numbers.length;
        for (let j=0; j < arraylength; j++) {
            // Detects a collision, chosen a random number twice
            if (random == numbers[j]) {
                // Signals that the proccess should be ran again
                i -= 1;
            }
        }
        // If the random number is different from the others, it is added to the array, and the country is recorded as an option
        if (check == i) {
            numbers.push(random);
            options.push(data.Response[random].Name);
        }
    }
    // Combines arrays and sends it as a response
    send = send.concat(options);
    resp.send(send);
});

// Handles saving the result to the results.json file
app.post('/result', function (req, resp){
    // Obtains the result from the body of the request
    const result = req.body.result;
    // Processes the result, splitting it into token, name, score and time
    let resultObj = JSON.parse(result);
    let token = resultObj.token;
    let name = resultObj.name;
    let score = resultObj.score;
    let time = resultObj.time;
    // Checks for a valid token value, either Authenticated or the code for test purposes
    if(token=='Authenticated' || token=='testcode'){
        score = parseInt(score);
        time = parseInt(time);
        // Reads the content of results.json in to the server, stores in obj variable
        var obj = JSON.parse(fs.readFileSync('results.json', 'utf8'));
        var results = obj['Results'];
        let match = false;
        // Checks for duplicate names, if duplicates detected, the highest scored name is retained
        for (let i = 0; i < results.length; i++){
            if (results[i].Name == name) {
                match = true;
                if (score > results[i].Score){
                    // Updates score and time with improved score
                    results[i].Score = score;
                    results[i].Time = time;
                }
                else if (score == results[i].Score){
                    // If scores are equal, the best time is retained
                    if (time < results[i].Time){
                        results[i].Time = time;
                    }
                }
            }
        }
        // If name is not a duplicate, it is added to results
        if (match == false) {
            results.push({'Name':name, 'Rank':0, 'Score':score,'Time':time});
        }
        // Function to sort the results
        results.sort(function (x,y) {
            var n = y.Score - x.Score;
            if (n !== 0) {
                return n;
            }
            return x.Time - y.Time;
        });
        // Updates the rank of the results
        for (let i = 0; i < results.length; i++) {
            results[i].Rank = i + 1;
        }
        // obj is written back to results.json
        let jsonStr = JSON.stringify(obj);
        fs.writeFile('results.json',jsonStr ,'utf8', function(err){
            if (err) throw err;
        });
        // Process worked
        resp.send('Success');
    // If the request has not been authorised, 403 (forbidden) code is sent
    } else {
        resp.sendStatus(403);
    }
});
// Get results for leaderboard
app.get('/results', async function(req, resp){
    // Open results.json
    var obj = JSON.parse(fs.readFileSync('results.json', 'utf8'));
    var results = obj['Results'];
    // Sends results as a response
    resp.send(results);
});
module.exports = app;