const config = require('../config')

exports.createDonation = function(req, res, next){
    console.log(req.body)
    var values = {
        title: req.body.title,
        donor: req.body.donor,
        status: req.body.status,
        category: req.body.category,
        img: req.body.img
    }
    var fields = [values.title, values.donor, values.status, values.category, values.img]

    var postG = 'SELECT insert_donations'
        postG += '(uuid_generate_v4(), $1, $2, $3, $4, $5)'

    config.db.query(postG, fields, function(err, rows, fields) {
        if(err){
            console.log(err)
            return err
        }
        if(rows){

            var ups_id = '{' + rows.rows[0].insert_donations + '}'
            var ups_fields = [ups_id, values.donor]

            var postGUp = 'SELECT upsert_user_donations'
            postGUp += '($1, $2)'

            config.db.query(postGUp, ups_fields, function(err, rows, ups_fields){
                if(err){
                    console.log(err)
                    return err
                }
                if(rows){
                    res.send(rows.rows[0])
                } else {
                    res.send({})
                }
            })

        } else {
            res.send({})
        }
    })
}