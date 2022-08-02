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

app.get('/lists', function(req, res){
    const query = myDataSource.query(`select users.id as userId, users.name as userName, posts.id as postingId, posts.title as postingTitle, content as postingContent from users inner join posts on users.id = posts.user_id`, (err, rows) => {
        res.status(200).json({data : rows});
    })
})

app.get('/lists/:id', function(req, res){
    const id = req.params.id
    const query = myDataSource.query(`select users.id as userId, users.name as userName, posts.id as postingId, posts.title as postingTitle, content as postingContent from users inner join posts on users.id = posts.user_id where posts.id = ${id}`, (err, rows) => {
        res.status(200).json({data : rows[id-1]});
    })
})

app.patch('/lists/:id', function(req, res){
    const id = req.params.id
    const content = req.body.content
    const query = myDataSource.query(`UPDATE posts SET ? WHERE id = ${id}`, {content:content})
    res.status(201).json({message: "UpdatedSuccess"});
})

app.delete('/posts/:id', function(req, res){
    const id = req.params.id
    const query = myDataSource.query(`DELETE FROM posts WHERE id = ${id}`)
    res.status(204).json({message: "postingDeleted"});
})

app.get('/likes', function(req, res){
    const query = myDataSource.query(`select users.id as userId, users.name as 좋아요누른사람, posts.id as postsId, posts.title as 좋아요누른글 from users inner join likes on users.id = likes.user_id inner join posts on likes.post_id = posts.id order by users.id, posts.id`, (err, rows) => {
        res.status(200).json({likes : rows});
    })
})

app.post('/likes', function(req, res){
    const {user_id, post_id} = req.body
    const sql = {user_id:user_id, post_id:post_id}
    const query = myDataSource.query(`INSERT INTO likes set ?`, sql)
    res.status(201).json({message: "likeCreated"});
})


app.listen(3000, function () {
  console.log('server listening on port 3000')
})

