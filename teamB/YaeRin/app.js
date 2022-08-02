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

//GET 유저의 게시글 조회
app.get("/posts-with-users", async (req, res) => {
  const { userId, name, title, description } = req.body;
  let arr = [];
  await myDataSource.query(
    `SELECT 
    posts.id, 
    posts.title, 
    posts.description, 
    users.name, 
    users.age 
    FROM users_posts ba 
    INNER JOIN users ON ba.user_id = users.id 
    INNER JOIN posts ON ba.post_id = posts.id`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

// PATCH post
app.patch("/posts", async (req, res) => {
  const { title, description, postId } = req.body;

  await myDataSource.query(
    `UPDATE posts
    SET
    title = ?,
    description = ?
    WHERE id = ?
    `,
    [title, description, postId]
  );
  res.status(201).json({ message: "Posts Edited!" });
});

// DELETE post
app.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  await myDataSource.query(
    `DELETE FROM posts
    WHERE posts.id = ${postId}
    `
  );
  res.status(200).json({ message: "Post Deleted!" });
});

// LIKE
app.post("/post", async (req, res) => {
  const { userId, postId } = req.body;
  await myDataSource.query(
    `INSERT INTO likes(user_id, post_id) VALUES (?, ?);`,
    [userId, postId]
  );
  res.status(201).json({ message: "Tap Like!" });
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
