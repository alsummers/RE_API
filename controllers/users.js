const config = require('../config')
const bcrypt = require('bcrypt')

exports.signup = function(req, res, next){
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        } else {
            var values = 
               {
                   first_name: req.body.first_name,
                   last_name: req.body.last_name,
                   username: req.body.username,
                   email: req.body.email,
                   password: hash
               }
            }

            var fields = [values.first_name, values.last_name, values.username, values.email, values.password]
            var postG = "INSERT INTO users (first_name, last_name, username, email, id, password)"
            postG += "VALUES($1, $2, $3, $4, uuid_generate_v4(), $5)"
            
            config.db.query(postG, fields, function (err, rows, fields) {
                if(err){
                    console.log(err)
                    return res.status(400).json({
                        error: err.detail
                    })
                }
                if(rows){
                    console.log(rows)
                    res.send(rows)
                } else {
                    res.send({})
                }
            })
        })
}

exports.getUsers = function(req, res, next){
    var fields = []

    var postG = "SELECT * FROM get_users()"
    config.db.query(postG , fields , function (err, rows, fields) {
        if(err) {
            console.log(err)
            return err
        }
        if(rows){
            res.send(rows.rows[0])
        } else {
            res.send({})
        }
    })
    
}

exports.deleteUser = function(req, res, next){
    var values = {id: req.body.id}
    var fields = [values.id]

    var postG = "DELETE FROM users WHERE id = $1"
    
    config.db.query(postG, fields, function (err, rows, fields){
        if(err){
            console.log(err)
            return err
        }
        if(rows){
            console.log(rows)
            res.send(rows)
        } else {
            res.send({})
        }
    })
}

