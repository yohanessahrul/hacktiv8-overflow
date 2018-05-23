const Question = require('../models/m.question')
const User = require('../models/m.user')
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
  },
  allQuestion: function (req, res) {
    Question.find().populate('User')
    .exec(function (err, response) {
      if (response) {
        res.status(200).json({
          msg: 'Berhasil mendapatkan semua data Question',
          data: response
        })
      } else {
        res.status(500).json({
          msg: 'Internal server error'
        })
      }
    })
  },
  deleteQuestion: function (req, res) {
    Question.findOneAndRemove({
      _id: req.params.id
    }, function (err, response) {
      if (err) {
        res.status(500).json({
          msg: 'Internal Server Error'
        })
      } else {
        res.status(200).json({
          msg: 'Data berhasil didapatkan',
          data: response
        })
      }
    })
  },
  comment: function (req, res) {
    let decoded = jwt.verify(req.headers.token, 'secretkeys')

    console.log('masuk controller ID = ', req.params.id)
    console.log(req.body.comment)
    Question.findOne({
      _id: req.params.id
    }, function (err, response) {
      if (!response) {
        res.status(400).json({
          msg: 'Tidak ada response !!!'
        })
      }
      if (response) {
        let objComment = {
          fullname: decoded.fullname,
          comment: req.body.comment,
        }
        console.log('ARRAY COMMENT ',response.comments)
        response.comments.push(objComment)
        console.log('AFTER COMMENT ',response.comments)

        Question.findByIdAndUpdate({_id: req.params.id}, {$set: {comments: response.comments}}, function (err, success) {
          if (err) {
            console.log(err)
          } else {
            res.status(200).json({
              msg: 'Komentar berhasil',
              data: success
            })
            console.log(success)
          }
        })

        console.log('===w=>', response, '<==W===')

      } else {
        res.status(500).json({
          msg: 'Internal server error!!!'
        })
      }
    })
  },
  detailquestion: function (req, res) {
    console.log('masuk ke controller')
    let decoded = jwt.verify(req.headers.token, 'secretkeys')
    Question.findById({ _id: req.params.id }, function (err, response) {
      if (err) {
        res.status(500).json({
          msg: 'Internal server error'
        })
      } else {
        res.status(200).json({
          msg: 'Detail berhasil didapatkan',
          data: response
        })
      }
    })
  },
  like: function (req, res) {
    let decoded = jwt.verify(req.headers.token, 'secretkeys')
    Question.findOne({
      _id: req.params.id
    }, function (err, response) {
      if (err) {
        res.status(400).json({
          msg: 'Data tidak ditemukan'
        })
      } else {
        console.log('respon pencarian controller =', response)
        let like = response.like
        console.log('like==', like)
        console.log(decoded.id)
        let availID = 0
        like.forEach(dataLike => {
          if (dataLike === decoded.id) {
            availID += 1
          }
        })

        if (availID === 0) {
          like.push(decoded.id)
        }
        console.log('after like ==', like)

        Question.findByIdAndUpdate({_id: req.params.id}, {$set: {like: response.like}}, function (err, success) {
          if (err) {
            console.log(err)
          } else {
            res.status(200).json({
              msg: 'Like berhasil',
              data: success
            })
            console.log('XXX',success)
          }
        })
      }
    })
  }
}