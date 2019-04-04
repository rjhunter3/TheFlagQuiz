const express = require('express');
const fetch = require('node-fetch');
var bodyParser = require('body-parser');
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

module.exports = app;