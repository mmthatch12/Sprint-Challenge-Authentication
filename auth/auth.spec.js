const logi = require('./auth-model')
const db = require('../database/dbConfig')

describe('auth-model', () => {
    beforeEach(async () => {
        await db('shoes').truncate()
    })

    describe('add()', () => {
        it('should add user to db', async () => {
            await logi.add({ username: 'net', password: 'net'})

            let user = await db('users')

            expect(user).toHaveLength(2)
        })
    })
})