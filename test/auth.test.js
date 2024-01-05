const app = require('../app');
const request = require('supertest');
const env = require('../environmentVariables');
const jwt = require('jsonwebtoken');
const JWT_SECRET = env.JWT_SECRET;
const qStrings = require('../db/sqlStrings');
const pool = require('../db/dbConfig');

afterAll(async () => {
    const text = qStrings.deleteUserByUsername
    var values = ["test"]
    await pool.query(text, values)
})

describe ('Auth Routes', () => {

    describe('POST /api/auth/signup', () => {
        it('Creates a new account', async () => {
            const result = await request(app)
                .post('/api/auth/signup')
                .send({username: 'test', password: 'test'})
            expect(result.status).toEqual(200)
            expect(result.body).toEqual(
                {message: 'Success! User test created.'}
            )
        })
    })

    describe('POST /api/auth/login', () => {
        it('Logs in to account', async () => {
            const result = await request(app)
                .post('/api/auth/login')
                .send({username: 'test', password: 'test'})
            expect(result.status).toEqual(200)
            expect(jwt.verify(result.body.token, JWT_SECRET).username).toEqual('test')
        })
    })

});