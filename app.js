const express = require('express');
const fetch = require('node-fetch');
var bodyParser = require('body-parser');
const app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


app.get('/randflag', async function(req, resp){
    console.log('hello there')
    let flag = false
    while (flag == false) {
        let rand = getRandomInt(0,900)
        console.log(rand)
        let response = await fetch("http://countryapi.gear.host/v1/Country/getCountries?pNumericCode=" + rand)
        let body = await response.text()
        let data = JSON.parse(body);
        console.log(data) /*Holy balls this works*/
        let check = data.UserMessage
        console.log()
        console.log(check)
        console.log()
        /*if (response.ok){
            flag = True
        }*/
        if (check == null){
            flag = true
        }
    }
    console.log('well this worked')
    let flagurl = data.Response[0].FlagPNG
    let countryname = data.Response[0].Name
    console.log(flagurl)
    console.log(countryname)
})

module.exports = app;