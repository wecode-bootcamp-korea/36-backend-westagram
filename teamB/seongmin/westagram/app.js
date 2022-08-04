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

const dataSource = new DataSource({
    type: `mysql`,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

dataSource.initialize()
    .then(()=> {
        console.log('Data Source has been initialized!')
    })
    .catch((err)=> {
        console.log('Error during Data Source intialization', err)
    })

//server health check
app.get('/ping', (req,res)=> {
    res.status(200).json({mesaage : 'pong'})
});

app.get('/users', async(req, res)=> {
    await dataSource.query(
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

    await dataSource.query(
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

app.post('/post', async(req, res) => {
    const { title, content, user_id } = req.body;

    await dataSource.query(`SELECT id FROM users;`, (err, idObjs) => { //게시글 유저 존재 확인
        for (const idObj of idObjs) {
            if (user_id === idObj['id']) {
                dataSource.query(
                    `INSERT INTO posts (
                        title,
                        content,
                        user_id
                    ) VALUES (?, ?, ?);`, [title, content, user_id]);
                return res.status(201).json({ message: "postCreated" });
            }
        }
        res.status(404).json({ message: "user id is not exist!" });
    });
});

app.listen(PORT, () => {
    console.log(`server is listning on ${PORT}`);
});