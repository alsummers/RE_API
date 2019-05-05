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

exports.login = function(req, res, next){
    var values = {
        password: req.body.password,
        username: req.body.username
    }

    var expect = 'username, first_name, last_name, email, password, id'
    var postG = `SELECT ${expect} FROM users WHERE username=$1`
    config.db.query(postG , [values.username] , function (err, rows, fields) {
        if(err) {
            console.log(err)
            return err
        }

        var user = rows.rows[0]
        if(user){
            bcrypt.compare(values.password, user.password, (err, result) => {
                if(err){
                    return res.status(404).json({
                        message: 'User Auth failed'
                    })
                }
                if(result){
                    var response = {
                        username: user.username,
                        firstname: user.first_name,
                        lastname: user.last_name,
                        email: user.email,
                        id: user.id
                    }
                    return res.status(200).json({
                        message: "Login Success",
                        result: response
                    })
                }
                res.status(404).json({
                    message: 'User Auth failed'
                })
                
            })
        } else {
            res.send({ message: 'User Auth failed'})
        }
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

