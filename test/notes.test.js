const app = require('../app');
const request = require('supertest');
const env = require('../environmentVariables');
const jwt = require('jsonwebtoken');
const JWT_SECRET = env.JWT_SECRET;
const qStrings = require('../db/sqlStrings');
const pool = require('../db/dbConfig');

var token;

beforeAll(async () => {
    const text = qStrings.insertNewUser;
    var values = ["test", "test"];
    const result = await pool.query(text, values)
    token = jwt.sign({id:result.rows[0].id, username:"test"}, JWT_SECRET, {
        expiresIn: '1h'
    })
})

afterAll(async () => {
    const text = qStrings.deleteUserByUsername
    var values = ["test"]
    await pool.query(text, values)
})

describe ('Notes Routes', () => {

    describe('POST /api/notes', () => {
        it('Creates a new note', async () => {
            const result = await request(app)
                .post('/api/notes')
                .send({note: 'test'})
                .set('Authorization', `Bearer ${token}`)
            expect(result.status).toEqual(200)
            expect(result.body.note.note).toEqual('test')
        })
    })

    describe('GET /api/notes', () => {
        it('Gets all notes', async () => {
            const result = await request(app)
                .get('/api/notes')
                .set('Authorization', `Bearer ${token}`)
            expect(result.status).toEqual(200)
            expect(result.body.length == 1)
            expect(result.body[0].note).toEqual('test')
        })
    })
    
});