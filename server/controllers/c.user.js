const User = require('../models/m.user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

module.exports = {
    register: function(req, res) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( re.test(String(req.body.email).toLowerCase()) === false ){
            res.status(500).json({
                message: 'Bukan format email yang benar !!!'
            })
        } else {
            if(req.body.password.length < 8) {
                res.status(500).json({
                    message: 'Panjang password minimal 8 digit'
                })
            } else {
                let passwrodEncrypt = bcrypt.hashSync(req.body.password)
                var data = new User({
                    email: req.body.email,
                    password: passwrodEncrypt,
                    fullname: req.body.fullname
                });
                data.save(function (err, response) {
                    if (!err) {
                        res.status(200).json({
                            message: 'Berhasil menambahkan user baru',
                            response: response
                        })
                    } else {
                        res.status(500).json({
                            message: 'Internal server error Guys!'
                        })
                    }
                })
            }
        }
    },
    login: function (req, res) {
        User.findOne({
            email: req.body.email
        })
        .then(response => {
            if (!response) {
                res.status(500).json({
                    msg: 'Mohon periksa kembali email anda!'
                })
            }
            
            let compare = bcrypt.compareSync(req.body.password, response.password)
            console.log(compare)
            if(compare){
                let payload = {
                    id: response._id,
                    email: response.email,
                    fullname: response.fullname
                }
                let token = jwt.sign(payload, 'secretkeys')

                res.status(200).json({
                    message: 'Password sama, selamat datang',
                    id: response._id,
                    fullname: response.fullname,
                    email: response.email,
                    token: token
                })
            } else {
                res.status(400).json({
                    message: 'Password tidak sama, periksa lagi'
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                msg: 'Internal server error 500'
            })
        })
    },
    profile: function (req, res) {
        let decoded = jwt.verify(req.headers.token, 'secretkeys')
        console.log(decoded.id)
        User.findOne({
          _id: decoded.id
        })
          .then((response) => {
            res.status(200).json({
              msg: 'Profile berhasil ditemukan',
              data: response
            })
          })
          .catch((err) => {
            res.status(500).json({
              msg: err
            })
          })
    }
}