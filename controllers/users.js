const config = require('../config')

exports.getUsers = function(req, res, next){
    var fields = []

    var postG = "SELECT * FROM users"
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

exports.createUser = function(req, res, next){
    var values = 
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            id: req.body.id,
            password: req.body.password
        }
    var fields = [values.first_name, values.last_name, values.username, values.email, values.id, values.password]

    var postG = "INSERT INTO users (first_name, last_name, username, email, id, password)"
        postG += "VALUES($1, $2, $3, $4, $5, $6)"
    
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
