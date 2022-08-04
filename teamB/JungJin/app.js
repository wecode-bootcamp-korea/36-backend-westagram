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

app.get('/data', function(req, res){
    myDataSource.query(`
    select 
        users.id as userId, 
        profile_image as userProfileImage, 
        posts.id as postingId, 
        imageurl as postingImageUrl, 
        content as postingContent 
    from users inner join posts on users.id = posts.user_id`, (err, rows) => {
            res.status(200).json({data : rows});
        }
    )
})

app.listen(process.env.PORT, function () {
  console.log(`server listening on port ${process.env.PORT}`)
})
