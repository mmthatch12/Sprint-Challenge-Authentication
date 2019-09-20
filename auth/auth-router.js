const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('./auth-model')



router.post('/register', (req, res) => {
  // implement registration
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 6)
  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
