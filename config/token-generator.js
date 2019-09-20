const jwt = require('jsonwebtoken')
const secrets = require('./secrets')

module.exports = {
    tokenGenerator
}

function tokenGenerator(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options ={
        expiresIn: '5h'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

