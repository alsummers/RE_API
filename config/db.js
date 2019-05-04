const { Pool } = require('pg')
require('dotenv').config()

const connect = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
const pool = new Pool({
    connectionString: connect
})
var client = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}

module.exports = client