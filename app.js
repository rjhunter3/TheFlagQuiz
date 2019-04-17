const express = require('express');
const fetch = require('node-fetch');
var bodyParser = require('body-parser');
var fs = require('fs');
const app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));

// Removes CORS errors
app.use(function(req, resp, next) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Gets random integer
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Services GET requests for random flags and countries
app.get('/randflag', async function(req, resp){
    console.log('hello there')
    let response = await fetch("http://countryapi.gear.host/v1/Country/getCountries")
    let body = await response.text()
    let data = JSON.parse(body);
    let rand = getRandomInt(0,250)
    let flagurl = data.Response[rand].FlagPng
    let countryname = data.Response[rand].Name
    console.log(flagurl)
    console.log(countryname)
    /*resp.send(flagurl)*/
    let send = []
    send.push(flagurl)
    let options = []
    let numbers = []
    options.push(countryname)
    numbers.push(rand)
    console.log(numbers)
    for (let i=0; i < 3; i++) {
        let random = getRandomInt(0,250)
        console.log(random)
        let check = i
        let arraylength = numbers.length;
        for (let j=0; j<arraylength; j++) {
            console.log(numbers[j])
            if (random == numbers[j]) {
                i -= 1
                console.log('### LOOK HERE ###')
            }
        }
        if (check == i) {
            numbers.push(random)
            options.push(data.Response[random].Name)
            console.log(numbers)
        }
    }
    /*
    for (k in options){
        send.push(k)
    }
    */
    send = send.concat(options)
    console.log(options)
    console.log(numbers)
    console.log(send)
    resp.send(send)

    /*
    let flag = false
    while (flag == false) {
        let rand = getRandomInt(0,900)
        console.log(rand)
        let response = await fetch("http://countryapi.gear.host/v1/Country/getCountries?pNumericCode=" + rand)
        let body = await response.text()
        let data = JSON.parse(body);
        console.log(data) /*Holy balls this works
        let check = data.UserMessage
        console.log()
        console.log(check)
        console.log()
        /*if (response.ok){
            flag = True
        }
        if (check == null){
            flag = true
            let flagurl = data.Response[0].FlagPng
            let countryname = data.Response[0].Name
            console.log(flagurl)
            console.log(countryname)
            resp.send(flagurl)
        }
    }
    */
    console.log('well this worked')
    /*
    console.log(data)
    let flagurl = data.Response[0].FlagPng
    let countryname = data.Response[0].Name
    console.log(flagurl)
    console.log(countryname)
    */
})

// Handles saving the score
app.post('/result', function (req, resp){
    const result = req.body.result;
    let pos1 = result.indexOf('%');
    let name = result.slice(0, pos1)
    let pos2 = result.indexOf('%',pos1 + 1)
    let score = result.slice(pos1 + 1,pos2)
    let time = result.slice(pos2 + 1)

    console.log(req.body);
    console.log(name);
    console.log(score);
    console.log(time);
    /*
    var obj;
    fs.readFile('scores.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
    });
    console.log(obj)
    /*potatoes.push(pot);*/
    var obj = JSON.parse(fs.readFileSync('scores.json', 'utf8'));
    /*console.log(obj)
    console.log(obj['Scores'])*/
    var scores = obj['Scores']
    console.log(scores)
    /*
    scores.sort(function(a,b) {
        return a.Score.localeCompare(b.Score) ? -1 : a.Time.localeCompare(b.Time);
    })
    */
    let match = false
    for (i = 0; i < scores.length; i++){
        if (scores[i].Name == name) {
            match = true
            if (score > scores[i].Score){
                scores[i].Score = score
                scores[i].Time = time
            }
            else if (score == scores[i].Score){
                //check time
                if (time < scores[i].Time){
                    scores[i].Time = time
                }
            }
        }
    }
    if (match == false) {
        scores.push({"Name":name, "Rank":0, "Score":score,"Time":time});
    }
    /*scores.push({"Name":name, "Rank":0, "Score":score,"Time":time});*/
    scores.sort(function (x,y) {
        var n = y.Score - x.Score;
        if (n !== 0) {
            return n;
        }
        return x.Time - y.Time;
    })
    console.log(scores)
    /*
    for (var row in obj['Scores']){
        console.log(row)
    }
    */
    for (i = 0; i < scores.length; i++) {
        scores[i].Rank = i + 1
    }
    console.log(scores)
    //obj['Scores'].push({"Name":name, "Rank":0, "Score":score,"Time":time});
    console.log(obj)

    jsonStr = JSON.stringify(obj);
    fs.writeFile('scores.json',jsonStr ,'utf8', function(err){
        if (err) throw err;
        console.log('complete')
    })
    console.log(jsonStr)
    resp.send("Fine that worked");
});

// Get scores for leaderboard
app.get('/scores', async function(req, resp){
    var obj = JSON.parse(fs.readFileSync('scores.json', 'utf8'));
    var scores = obj['Scores']
    console.log(scores)
    resp.send(scores);
});
module.exports = app;