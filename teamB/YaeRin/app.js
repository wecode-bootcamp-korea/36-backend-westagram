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

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.post("/users/sign-up", async (req, res) => {
  const { name, age } = req.body;

  await myDataSource.query(`
    INSERT INTO users (
      name, 
      age
    ) VALUES (?, ?)`,
    [name, age]
  );

  res.status(201).json({ message: "New User Created!" });

});

app.post("/posts", async (req, res, next) => {
  const { title, description, userId } = req.body;

  await myDataSource.query(`
    INSERT INTO posts (
      title, 
      description,
      user_id
    ) VALUES (?, ?, ?);`,
    [title, description, userId]
  );

  res.status(201).json({ message: "New Post Created!" });
});

app.get("/posts", async (req, res) => {

  const allPosts = await myDataSource.query(`
    SELECT * 
    FROM posts
    `)

  res.status(200).json({ data: allPosts });
    }
  );

app.get("/posts-with-users", async (req, res) => {
  const { name, age, title, description } = req.body;

  const pWu = await myDataSource.query(`
    SELECT 
      u.id, 
      u.name, 
      u.age, 
      p.title, 
      p.description 
    FROM users u 
    INNER JOIN posts p 
    ON u.id = p.user_id
    `)

      let postings = [];
      let data = {
        id: pWu[0].id,
        name: pWu[0].name,
        age: pWu[0].age,
        postings,
      };

      for (let i of pWu) {
        postings.push({
          title: i.title,
          description: i.description,
        });
      }

      res.status(200).json({ data });
});

app.patch("/posts/:postId", async (req, res) => {
  const { title, description } = req.body;
  const { postId } = req.params;

  await myDataSource.query(`
    UPDATE posts
    SET title = ?,
        description = ?
    WHERE posts.id = ${postId}`,
    [title, description]
    );

  myDataSource.query(`
    SELECT 
      posts.user_id AS userId,
      users.name AS userName,
      posts.id AS postingId,
      posts.title AS postingTitle,
      posts.description AS postingDesc
    FROM posts 
    INNER JOIN users 
    ON (posts.user_id = users.id AND posts.id = ${postId})`,

    (err, data) => {
      res.status(201).json(data);
    });
});


app.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  await myDataSource.query(`
    DELETE FROM posts
    WHERE posts.id = ${postId}`
  );

  res.status(200).json({ message: "Post Deleted!" });
});

app.post("/like", async (req, res) => {
  const { userId, postId } = req.body;

  await myDataSource.query(`
    INSERT INTO likes (
      user_id, 
      post_id
    ) VALUES (?, ?);`,
    [userId, postId]
  );

  res.status(201).json({ message: "Like Button Tapped!" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const serverListening = () =>
  console.log(`💫 Server listening on port http://localhost:${PORT} ⛱`);

server.listen(PORT, serverListening);