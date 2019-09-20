const request = require('supertest');
const authRoute = require('./auth-router')
const logi = require('./auth-model')
const db = require('../database/dbConfig')

// describe('server.js', () => {
//     describe('post /register', () => {
//       it('returns 200 OK', () => {
//         // make a GET request to the / endpoint on the server
//         return request(authRoute)
//           .post('/register')
//           .then(res => {
//             // assert that we get an http status code 200
//             expect(res.status).toBe(201);
//           });
//       });
  
//       it("should return { api: 'up' }", async () => {
//         const res = await request(authRoute).get('/');
  
//         expect(res.body.api).toBe('up');
//         expect(res.body).toEqual({ api: 'up' });
//       });
  
//       it('returns JSON', done => {
//         request(server)
//           .get('/')
//           .then(res => {
//             // assert that we get an http status code 200
//             expect(res.type).toMatch(/json/i);
//             done();
//           });
//       });
//     });
//   });


describe('auth-model', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
      });

    describe('add()', () => {
        it('should add user to db', async () => {
            await logi.add({ username: 'net', password: 'net'})

            let user = await db('users')
            console.log(user)

            expect(user).toHaveLength(1)
        })
        it('should add only one user at a time', async () => {
            await logi.add({ username: 'net', password: 'net'})
            await logi.add({ username: 'det', password: 'det'})
            let user = await db('users')
            console.log(user)

            expect(user).toHaveLength(2)
        })
    })
    
})