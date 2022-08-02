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

app.get('/users', function(req, res){
    const query = myDataSource.query(`SELECT * FROM users`, (err, rows) => {
        res.status(200).json({users : rows});
    })
})

app.post('/users', function(req, res){
    const {name, email, profile_image, password} = req.body
    const sql = {name:name, email:email, profile_image:profile_image, password:password}
    const query = myDataSource.query(`INSERT INTO users set ?`, sql)
    res.status(201).json({message: "userCreated"});
})

app.get('/posts', function(req, res){
    const query = myDataSource.query(`SELECT * FROM posts`, (err, rows) => {
        res.status(200).json({posts : rows});
    })
})

app.post('/posts', function(req, res){
    const {title, content, user_id} = req.body
    const sql = {title:title, content:content, user_id:user_id}
    const query = myDataSource.query(`INSERT INTO posts set ?`, sql)
    res.status(201).json({message: "postCreated"});
})

app.get('/data', function(req, res){
    const query = myDataSource.query(`select users.id as userId, profile_image as userProfileImage, posts.id as postingId, imageurl as postingImageUrl, content as postingContent from users inner join posts on users.id =
    posts.user_id`, (err, rows) => {
        res.status(200).json({data : rows});
    })
})

app.get('/data/:id', function(req, res){
    const id = req.params.id
    const query = myDataSource.query(`select users.id as userId, profile_image as userProfileImage, posts.id as postingId, imageurl as postingImageUrl, content as postingContent from users inner join posts on users.id =
    posts.user_id where users.id = ${id}`, (err, rows) => {
        let postings = []
        let data = {
            userId: rows[0].userId,
            userProfileImage: rows[0].userProfileImage,
            postings:postings
        }
        for(let r of rows){
            postings.push({
                postingId: r.postingId,
                postingImageUrl: r.postingImageUrl,
                postingContent: r.postingContent
            })
        }
        res.status(200).json({data : data});
    })
})

app.listen(3000, function () {
  console.log('server listening on port 3000')
})

