
'use strict';
//var express = require('express')
//var bodyParser = require('body-parser')
const request = require('supertest');
const app = require('./app');
//var app = express()
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))


jest.setTimeout(30000);

describe('Test random flag service', () => {
    test('GET /randflag succeeds', () => {
        return request(app)
            .get('/randflag')
            .expect(200);
    })
    test('GET /randflag returns JSON', () => {
        return request(app)
            .get('/randflag')
            .expect('Content-type', /json/);
    })
    test('GET /randflag returns a flag URL', () => {
        return request(app)
            .get('/randflag')
            .expect(function(res) {
                //console.log(res)
                console.log(res.text)
                let parse = JSON.parse(res.text)
                console.log(parse[0])
                let url = parse[0].substr(0,28)
                console.log(url)
                if(!(url == 'https://api.backendless.com/')) throw new Error("Bad URL")
            })
    })
    test('GET /randflag return different options', () => {
        return request(app)
            .get('/randflag')
            .expect(function(res) {
                //console.log(res)
                console.log(res.text)
                let parse = JSON.parse(res.text)
                if(!((parse[1] != parse[2]) && (parse[1] != parse[3]) && (parse[1] != parse[4]) && (parse[2] != parse[3]) && (parse[2] != parse[4]) && (parse[3] != parse[4]))) throw new Error("Duplicate options")
            })
    })
})
describe('Test result posting service', () => {
    //app.post('/', function(req, res){
        //res.send(req.body.name);
    //});
    test('POST /result requires a valid access token', () => {
        const params = JSON.stringify({"token": 'WrongToken', "name": 'test', "score": 0, "time": 0});
        console.log(params)
        return request(app)
            .post('/result')
            .type('form')
            .send("result=" + params)
            .expect(403)
    })
})
describe('Test score viewing service', () => {
    test('GET /scores succeeds', () => {
        return request(app)
            .get('/scores')
            .expect(200);
    })
    test('GET /scores returns JSON', () => {
        return request(app)
            .get('/scores')
            .expect('Content-type', /json/);
    })
})
