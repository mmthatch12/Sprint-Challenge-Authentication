const request = require('supertest');
const server = require('../api/server')
const logi = require('./auth-model')
const db = require('../database/dbConfig')

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

describe('server.js', () => {
    describe('post /register', () => {
      it('returns 500 without auth', () => {
        // make a GET request to the / endpoint on the server
        return request(server)
          .post('/api/auth/register')
          .then(res => {
            expect(res.status).toBe(500);
          });
      });
  
      it('returns 500 without auth', () => {
        // make a GET request to the / endpoint on the server
        return request(server)
          .post('/api/auth/login')
          .then(res => {
            expect(res.status).toBe(500);
          });
      });
  
      it('returns text', done => {
        request(server)
          .get('/api/auth/login')
          .then(res => {
            expect(res.type).toMatch(/text/i);
            done();
          });
      });
    });
  });