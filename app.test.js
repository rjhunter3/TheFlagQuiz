
'use strict';

const request = require('supertest');
const app = require('./app');
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
})