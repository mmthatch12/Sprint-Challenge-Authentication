const logi = require('./auth-model')
const db = require('../database/dbConfig')

describe('auth-model', () => {
    beforeEach(async () => {
        await db('shoes').truncate()
    })
    
})