const db = require('../database/dbConfig')

module.exports = {
    add,
    find,
    findBy,
    findById,
}

async function add(body) {
    const [id] = await db('users').insert(body, 'id')

    return findById(id)
}

function find() {
    return db('users')
}

function findBy(body) {
    return db('users').where(body)
}

function findById(id) {
    return db('users').where({ id }).first()
}