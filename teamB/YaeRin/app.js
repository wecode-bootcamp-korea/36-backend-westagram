const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const { DataSource } = require("typeorm");
const { runInNewContext } = require("vm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

// POST user
app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  await myDataSource.query(`INSERT INTO users(name, age) VALUES (?, ?);`, [
    name,
    age,
  ]);
  res.status(201).json({ message: "New User Created!" });
});

// POST post
app.post("/posts", async (req, res, next) => {
  const { title, description } = req.body;

  await myDataSource.query(
    `INSERT INTO posts(title, description) VALUES (?, ?);`,
    [title, description]
  );

  res.status(201).json({ message: "New Post Created!" });
});

// GET all posts
app.get("/posts", async (req, res) => {
  await myDataSource.query(
    `SELECT p.id, p.title, p.description FROM posts p`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

// GET 유저의 게시글 조회
app.get("/posts-with-users", async (req, res) => {
  const { name, age, title, description } = req.body;
  await myDataSource.query(
    `SELECT 
    posts.id, 
    posts.title, 
    posts.description, 
    users.name, 
    users.age 
    FROM users_posts AS up 
    INNER JOIN users ON up.user_id = users.id 
    INNER JOIN posts ON up.post_id = posts.id`,
    (err, rows) => {
      let postings = [];
      let data = {
        id: rows[0].id,
        name: rows[0].name,
        age: rows[0].age,
        postings: postings,
      };
      for (let i of rows) {
        postings.push({
          title: i.title,
          description: i.description,
        });
      }
      res.status(200).json({ data });
    }
  );
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const serverListening = () =>
  console.log(`💫 Server listening on port http://localhost:${PORT} ⛱`);

server.listen(PORT, serverListening);

// http -v GET http://127.0.0.1:8000/ping
// http -v POST http://127.0.0.1:8000/posts title="test title" description="test desc"
// http -v POST http://127.0.0.1:8000/users name="test user" age="20"
// http -v GET http://127.0.0.1:8000/posts-with-users
// http -v GET http://127.0.0.1:8000/posts
// http -v PATCH http://127.0.0.1:8000/posts postId='1' title="My Neighborhood Totoro" description="Totoro is cute"
// http -v DELETE http://127.0.0.1:8000/posts/6
// http -v POST http://127.0.0.1:8000/post userId='1' postId='1'
// http -v GET http://127.0.0.1:8000/postlikeuser
