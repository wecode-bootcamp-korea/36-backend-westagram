const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config();

const { DataSource } = require("typeorm");

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
    console.log("Data Source has been initialize");
});

app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// health check
app.get("/ping", (reg, res) => {
    res.status(201).json({ message: "pong" });
});

// 회원가입 엔드포인트
app.post("/user/signup", async (req, res) => {
    const { name, email, password, profile_image } = req.body;

    await myDataSource.query(
        ` 
        INSERT INTO users(
            name,
            email,
            password,
            profile_image
        ) VALUES (?,?,?,?);
        `,
        [name, email, password, profile_image]
    );
    res.status(201).json({ message: "userCreated" });
});

// 게시글 등록 엔드포인트
app.post("/posts", async (req, res) => {
    const { title, content, user_id } = req.body;

    await myDataSource.query(
        ` 
        INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?,?,?);
        `,
        [title, content, user_id]
    );
    res.status(201).json({ message: "postCreated" });
});

// 전체 게시글 조회
app.get("/posts", async (req, res) => {
    await myDataSource.manager.query(
        `SELECT 
            u.id AS userId,
            u.profile_Image AS userProfileImage,
            p.id AS postingId,
            p.title AS postingTitle,
            p.content AS postingContent
        FROM users u
        INNER JOIN posts p ON
        u.id = p.user_id
        `,
        (err, rows) => {
            res.status(200).json({ data: rows });
        }
    );
});

// 유저의 게시글 조회
app.get("/posts/:userId", async (req, res) => {
    const { userId } = req.params;

    await myDataSource.manager.query(
        `SELECT
            u.id AS userId,
            u.name AS userName,
            u.profile_Image AS userProfileImage,
            p.id AS postingId,
            p.title AS postingTitle,
            p.content AS postingContent
        FROM users u
        INNER JOIN posts p ON u.id = p.user_id
        WHERE u.id = ${userId}
        `,
        (err, rows) => {
            let postings = [];
            let data = {
                userId : rows[0].userId,
                userName: rows[0].userName,
                userProfileImage : rows[0].userProfileImage,
                postings
            }
            for(let i in rows){
                postings.push({
                    postingId: rows[i].postingId,
                    postingTitle: rows[i].postingTitle,
                    postingContent: rows[i].postingContent
                })
            }
            res.status(200).json({ data: data });
        }
    );
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
