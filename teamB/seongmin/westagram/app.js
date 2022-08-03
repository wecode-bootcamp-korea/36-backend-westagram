const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
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

//모든 사용자 조회
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

//회원가입
app.post('/users/signUp', async(req, res) => {
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
})

app.listen(PORT, () => {
    console.log(`server is listning on ${PORT}`);
});