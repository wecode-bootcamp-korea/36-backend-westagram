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
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
    myDataSource.destroy();
  });

app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//health check
app.get("/ping", (req, res) => {
  res.status(201).json({ message: "pong" });
});

//signup
app.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;

  await myDataSource.query(
    `INSERT INTO users (
      name, 
      email, 
      password
    ) VALUES (?, ?, ?)`,

    [name, email, password]
  );

  res.status(201).json({ message: "userCreated" });
});

//posts
app.post("/posts", async (req, res, next) => {
  const { title, content } = req.body;

  await myDataSource.query(
    `INSERT INTO posts (
      title, 
      content
    ) VALUES (?, ?)`,

    [title, content]
  );

  res.status(201).json({ message: "postCreated" });
});

//posts list
app.get("/posts/list", async (req, res, next) => {

  await myDataSource.query(
    `SELECT 
        u.id as "userId", 
        u.name as "userName", 
        p.id as "postingId", 
        p.title as "postingTitle", 
        p.content as "postingContent" 
    FROM posts p 
    INNER JOIN users u ON p.user_id = u.id order by p.id`,
    (error, rows) => {

      res.status(200).json({ "data" : rows });
    }
  );
});

//posts list for each user
app.get("/posts/list/userId=:userId", async(req, res, next) => {
  const {userId} = req.params;

  await myDataSource.query(
    `SELECT
        u.id as "userId",
        u.name as "userName",
        p.id as "postingId",
        p.title as "postingTitle",
        p.content as "postingContent"
    FROM users u
    INNER JOIN posts p ON p.user_id = u.id
    where u.id = ${userId}
    order by p.id`,
    (error, rows) => {

      let postings = []
      let data = {
          userId: rows[0].userId,
          userName: rows[0].userName,
          postings: postings
      }

      for(let postlist of rows){
          postings.push({
              postingId: postlist.postingId,
              postingTitle: postlist.postingTitle,
              postingContent: postlist.postingContent
          });
      }

      res.status(200).json({ "data" : data });
    }
  );
});

//patch post
app.patch("/posts/list/:postId", async(req, res, next) => {
  const { postingContent } = req.body;
  const { postId }  = req.params;
  
  await myDataSource.query(
    `UPDATE
        posts 
    SET 
      content = ?
    WHERE id = ${postId}`,

    [ postingContent ]
  );

  myDataSource.query(
    `SELECT
        u.id as "userId", 
        u.name as "userName", 
        p.id as "postingId", 
        p.title as "postingTitle", 
        p.content as "postingContent" 
    FROM posts p 
    INNER JOIN users u on u.id = p.user_id 
    WHERE p.id = ${postId}`,
    (error, rows) => {

      res.status(200).json({ "data" : rows });
    }
  );

  
});

//delete post
app.delete("/posts/list/:postId", async(req, res, next) => {
  const { postId } = req.params;

  await myDataSource.query(
    `DELETE
    FROM posts
    WHERE id = ${postId}`,
  );

  res.status(200).json({ message : "postingDeleted" });
});

//tab like button
app.post("/posts/:postId", async (req, res, next) => {
  const { userId, postId } = req.body;

  await myDataSource.query(
    `INSERT INTO likes (
        user_id, 
        post_id
    ) VALUES (?, ?)`,

    [userId, postId]
  );

  res.status(201).json({ message : "likeCreated" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
