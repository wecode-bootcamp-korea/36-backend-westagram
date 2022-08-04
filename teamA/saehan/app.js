const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    });
const PORT = process.env.PORT;


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.get('/ping', function (req, res) {
  res.status(200).json({message: 'pong'})
});

app.get('/viewAllPosts', async(req,res,next) => {
    await myDataSource.query(
        `SELECT 
            posts.id,
            posts.title,
            posts.content,
            posts.user_id
        FROM posts
        `, (err, rows) => {
            res.status(200).json({"data" : rows})
        }
    );
});

app.get('/viewSomeonePost/:userId', async(req,res,next) => {
    const { userId } = req.params;
        await myDataSource.query(
            `SELECT
                    p.id as postingId,
                    p.title,
                    p.content,
                    p.user_id
            FROM posts p,users u
            WHERE p.user_id = ${userId}
            `, (err, rows) => {
                console.log(rows);
                let obj = {
                    Id : parseInt(userId)
                };
                obj["postings"]=rows;
                res.status(200).json({"data": obj})
            }
        );
});

app.post('/signup', async(req, res, next) => {
   const  { name, email, password } = req.body;
   await myDataSource.query(
    `INSERT INTO users(
        name,
        email,
        password
    ) VALUES (?, ?, ?);
    `,
    [name, email, password]
   );
   res.status(201).json({ message : "userCreated"})
});

app.post('/posts', async(req,res,next) => {
    const { title, content, user_id } =req.body;
    await myDataSource.query(
        `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
        `,
        [title, content, user_id]
    );
    res.status(201).json({message : "postCreated"});
});
 
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.error(err);
    }
};

start();