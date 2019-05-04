var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    {Client} = require('pg')
    app = express();
require('dotenv').config()
const controllers = require('./controllers')


const api = require('./routes/api')
    //DB connect string
const connect = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use('/api', api)

app.get('/test', function(req, res){
    console.log('TEST', connect)
        //     connectionString: connect
        // })
        
        // client.connect().then(() => console.log("connected to database"))
        // .then(() => client.query("select * from users"))
        // .then((results) => console.table(results.rows))
        // .catch((err) => console.log(err))
        // .finally(() => client.end())
})

app.listen(process.env.PORT, function(){
    console.log(`Server started on port ${process.env.PORT}`)

})
