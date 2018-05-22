const router = require('express').Router()
const controllerQuestions = require('../controllers/c.question')
const auth = require('../middleware/auth')

router.get('/', function (req, res) {
  res.status(200).json({
      msg: 'Ini endpoint dari questions'
  })
})
router.post('/addquestion' , controllerQuestions.addquestion)
router.get('/myquestion' , controllerQuestions.myQuestion)

module.exports = router