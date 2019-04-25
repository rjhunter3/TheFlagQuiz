
// Jest tests
'use strict';
const request = require('supertest');
const app = require('./app');
jest.setTimeout(30000);
// Tests for the random flag GET method
describe('Test random flag service', () => {
    test('GET /randflag succeeds', () => {
        return request(app)
            .get('/randflag')
            .expect(200);
    });
    test('GET /randflag returns JSON', () => {
        return request(app)
            .get('/randflag')
            .expect('Content-type', /json/);
    });
    test('GET /randflag returns a flag URL', () => {
        return request(app)
            .get('/randflag')
            .expect(function(res) {
                let parse = JSON.parse(res.text);
                let url = parse[0].substr(0,28);
                if(!(url == 'https://api.backendless.com/')) throw new Error('Bad URL');
            });
    });
    test('GET /randflag return different options', () => {
        return request(app)
            .get('/randflag')
            .expect(function(res) {
                let parse = JSON.parse(res.text);
                if(!((parse[1] != parse[2]) && (parse[1] != parse[3]) && (parse[1] != parse[4]) && (parse[2] != parse[3]) && (parse[2] != parse[4]) && (parse[3] != parse[4]))) throw new Error('Duplicate options');
            });
    });
});
// Tests for the result POST method
describe('Test result posting service', () => {
    test('POST /result requires a valid access token', () => {
        const params = JSON.stringify({'token': 'WrongToken', 'name': 'test', 'score': 0, 'time': 0});
        return request(app)
            .post('/result')
            .type('form')
            .send('result=' + params)
            .expect(403);
    });
});
// Tests for the results GET method
describe('Test result viewing service', () => {
    test('GET /results succeeds', () => {
        return request(app)
            .get('/results')
            .expect(200);
    });
    test('GET /results returns JSON', () => {
        return request(app)
            .get('/results')
            .expect('Content-type', /json/);
    });
});
