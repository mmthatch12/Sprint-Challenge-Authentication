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
  let { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then(uesr => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user)
        res.status(200).json({ message: `Welcome ${user.username}!`, token })
      } else {
        res.status(401).json({ message: 'You are not authorized'})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
});

module.exports = router;
