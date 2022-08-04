const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const myDataSource = new DataSource({
    type: `mysql`,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

myDataSource.initialize()
    .then(()=> {
        console.log('Data Source has been initialized!')
    })

//server health check
app.get('/ping', (req,res)=> {
    res.status(200).json({mesaage : 'pong'})
});

app.get('/users', async(req, res)=> {
    await myDataSource.query(
    `SELECT
        u.id,
        u.name,
        u.email,
        u.profile_image,
        u.created_at
    FROM users u;`, (err, rows) => {
        res.status(200).json(rows);
    });
});

app.post('/users/sign-up', async(req, res) => {
    const { name, email, profile_image, password } = req.body;
    await myDataSource.query(
        `INSERT INTO users (
            name,
            email,
            profile_image,
            password
        ) VALUES (?, ?, ?, ?);`,
        [name, email, profile_image, password]
    );

    res.status(201).json({ mesaage: "userCreated"});
});

app.post('/posts/add-post', async(req, res) => {
    const { title, content, user_id } = req.body;
    await myDataSource.query(
        `INSERT INTO posts (
            title, content, user_id
        ) VALUES (?, ?, ?);`, [title, content, user_id]
    );
    res.status(201).json({ message : "postCreated"});
});

app.listen(PORT, () => {
    console.log(`server is listning on ${PORT}`);
});