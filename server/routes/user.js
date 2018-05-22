const router = require('express').Router()
const controllerUser = require('../controllers/c.user')
const auth = require('../middleware/auth')

router.get('/', function (req, res) {
  res.status(200).json({
      msg: 'Ini endpoint dari users'
  })
})
router.post('/register', auth.cekKetersediaanEmail , controllerUser.register)
router.post('/login', controllerUser.login)
router.get('/profile', controllerUser.profile)

module.exports = router