const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
const { DataSource } = require('typeorm')
const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})
myDataSource.initialize()
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());


app.get('/ping', function(req, res){
    res.json({message: 'pong'})
})

app.listen(3000, function () {
  console.log('server listening on port 3000')
})

