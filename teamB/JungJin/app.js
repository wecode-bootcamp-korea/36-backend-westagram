const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
const { DataSource } = require('typeorm')
const database = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})
database.initialize()

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());

app.get('/ping', function(req, res){
    res.json({message: 'pong'})
})

app.get('/users', function(req, res){
    database.query(`
        SELECT 
            id, 
            name, 
            email, 
            profile_image, 
            password, 
            created_at, 
            updated_at 
        FROM users`, (err, rows) => {
            res.status(200).json({users : rows});
        }
    )
})

app.post('/users', function(req, res){
    const {name, email, profile_image, password} = req.body
    database.query(`
        INSERT INTO users(
            name, 
            email, 
            profile_image, 
            password
        ) VALUES (?, ?, ?, ?)`, 
        [name, email, profile_image, password]
    )

    res.status(201).json({message: "userCreated"});
})

app.get('/posts', function(req, res){
    database.query(`
        SELECT 
            id,
            title,
            content,
            imageurl,
            user_id,
            created_at,
            updated_at 
        FROM posts`, (err, rows) => {
            res.status(200).json({posts : rows});
        }
    )
})

app.post('/posts', function(req, res){
    const {title, content, user_id} = req.body
    database.query(`
        INSERT INTO posts(
            title,
            content,
            user_id    
        ) VALUES (?, ?, ?)`, 
        [title, content, user_id]
    )

    res.status(201).json({message: "postCreated"});
})

app.delete('/posts/:id', function(req, res){
    const id = req.params.id
    database.query(`
        DELETE 
        FROM posts 
        WHERE id = ${id}`
    )

    res.status(204).json({message: "postingDeleted"});
})

app.get('/data', function(req, res){
    database.query(`
        SELECT 
            users.id as userId, 
            profile_image as userProfileImage, 
            posts.id as postingId, 
            imageurl as postingImageUrl, 
            content as postingContent 
        FROM users 
        INNER JOIN posts ON users.id = posts.user_id`, (err, rows) => {
            res.status(200).json({data : rows});
        }
    )
})

app.get('/data/:id', function(req, res){
    const id = req.params.id
    database.query(`
        SELECT 
            users.id AS userId, 
            profile_image AS userProfileImage, 
            posts.id AS postingId, 
            imageurl AS postingImageUrl, 
            content AS postingContent 
        FROM users 
        INNER JOIN posts ON users.id = posts.user_id 
        WHERE users.id = ${id}`, (err, rows) => {
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
        }
    )
})

app.get('/lists', function(req, res){
    database.query(
        `SELECT 
            users.id AS userId, 
            users.name AS userName, 
            posts.id AS postingId, 
            posts.title AS postingTitle, 
            content AS postingContent 
        FROM users 
        INNER JOIN posts ON users.id = posts.user_id`, (err, rows) => {
            res.status(200).json({data : rows});
        }
    )
})

app.get('/lists/:id', function(req, res){
    const id = req.params.id
    database.query(`
        SELECT 
            users.id AS userId, 
            users.name AS userName, 
            posts.id AS postingId, 
            posts.title AS postingTitle, 
            content AS postingContent 
        FROM users 
        INNER JOIN posts ON users.id = posts.user_id 
        WHERE posts.id = ${id}`, (err, rows) => {
            res.status(200).json({data : rows[0]});
        }
    )
})

app.patch('/lists/:id', function(req, res){
    const id = req.params.id
    const content = req.body.content
    database.query(`
        UPDATE posts 
            SET ? WHERE id = ${id}`, 
            {content:content}
        )

    res.status(201).json({message: "UpdatedSuccess"});
})


app.get('/likes', function(req, res){
    database.query(`
        SELECT 
            users.id AS userId, 
            users.name AS 좋아요누른사람, 
            posts.id AS postsId, 
            posts.title AS 좋아요누른글 
        FROM users 
        INNER JOIN likes ON users.id = likes.user_id 
        INNER JOIN posts ON likes.post_id = posts.id 
        ORDER BY users.id, posts.id`, (err, rows) => {
            res.status(200).json({likes : rows});
        }
    )
})

app.post('/likes', function(req, res){
    const {user_id, post_id} = req.body
    database.query(`
        INSERT INTO likes(
            user_id,
            post_id
        ) VALUES (?, ?)`, 
        [user_id, post_id]        
    )

    res.status(201).json({message: "likeCreated"});
})

app.listen(process.env.PORT, function () {
  console.log(`server listening on port ${process.env.PORT}`)
})