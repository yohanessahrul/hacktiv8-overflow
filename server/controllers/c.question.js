const Question = require('../models/m.question')
const jwt = require('jsonwebtoken')

module.exports = {
    addquestion: function (req, res) {
    let decoded = jwt.verify(req.headers.token, 'secretkeys')

    var newQuestion = new Question({
      title: req.body.title, 
      q: req.body.question,
      author: decoded.id
    });
    newQuestion.save(function (err, response) {
      if (err) {
        res.status(500).json({
          msg: 'Internal server error'
        })
      } else {
        res.status(200).json({
          msg: 'Anda berhasil memasukkan data question',
          data: response
        })
      }
    })
  },
  myQuestion: function (req, res) {
      console.log('masuk controller');
      
    let decoded = jwt.verify(req.headers.token, 'secretkeys')

    Question.find({
      author: decoded.id
    }, function(err, response) {
      if (err) {
        res.status(500).json({
          msg: 'Internal server error gan'
        })
      } else {
        res.status(200).json({
          msg: 'Data berhasil didapatkan',
          data: response
        })
      }
    })
  }
}