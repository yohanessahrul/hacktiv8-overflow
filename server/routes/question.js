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
router.get('/allquestion' , controllerQuestions.allQuestion)
router.delete('/deletequestion/:id', controllerQuestions.deleteQuestion)
router.post('/comment/:id', controllerQuestions.comment)
router.get('/detailquestion/:id', controllerQuestions.detailquestion)
router.get('/like/:id', controllerQuestions.like)

module.exports = router