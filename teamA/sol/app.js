const http = require ("http");
const express = require ("express");
const cors  = require ("cors");
const morgan = require ("morgan");

const dotenv = require ("dotenv");
dotenv.config()

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
    .then(() => {
        console.log("Data Source has been initialized!")
    });

const app = express()

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.get("/ping", (req, res) => {
    res.json({ message : "pong"});
});

app.post ("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    await myDataSource.query(
        `INSERT INTO users (
            name, 
            email, 
            password
         ) VALUES (?, ?, ?)`,
         [name, email, password]
    );

    res.status(201).json({ "message" : "userCreated" });
});

app.post ("/posting", async (req, res) => {
    const { title, content, userId } = req.body;

    await myDataSource.query(
        `INSERT INTO posts (
            title,
            content,
            user_id
        ) VALUES (?, ?, ?)`,
        [title, content, userId]
    );

    res.status(201).json({ "message" : "postCreated" });
});

app.get("/posting", async (req, res) => {
    const posts = await myDataSource.query(
        `SELECT
            users.id userId,
            posts.id postingId,
            posts.title postingTitle,
            posts.content postingContent 
        FROM users
        INNER JOIN posts
        on users.id = posts.user_id;`
        );

    res.status(200).json({ data : posts });
});

app.delete("/posting/:postingId", async (req, res) => {
    const { postingId } = req.params;

    await myDataSource.query(
        `DELETE FROM posts
         WHERE posts.id = ${postingId}`
    );
    res.status(200).json({ "message" : "postingDeleted" });
});



const server = http.createServer(app)
const PORT = process.env.PORT;

const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
}

start()