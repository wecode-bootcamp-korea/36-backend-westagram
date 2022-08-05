const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");


const dotenv = require("dotenv");
dotenv.config()

const { DataSource } = require('typeorm');
const { title } = require("process");

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
    console.log("Data Source has been initialized");
  })

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

//health check
app.get("/ping", (req,res) => {
  res.status(200).json({ message: "pong"});
});


app.post('/users', async (req, res) => {
  const { id, password, name, age} = req.body

  await myDataSource.query(
    `INSERT INTO users(
      id,
      password,
      name,
      age
    ) VALUES(?, ?, ?, ?);
    `, [ id, password , name, age ]
  ) 
      res.status(201).json({ message: 'userCreated'})
});


app.post('/posts', async (req, res) => {
  const { user_id, title, post } = req.body

  await myDataSource.query(
    `INSERT INTO posts(
      user_id,
      title,
      post
    ) VALUES (?, ?, ?)
    `, [ user_id, title, post ]
  )
      res.status(201).json({ message: 'postCreated'})
})


app.get('/posts/view-all', async (req, res) => {
  await myDataSource.manager.query(
    `SELECT 
      user_id,
      title,
      post
       FROM posts`,
    (err, rows) => {
      res.status(200).json(rows)
    }
  ) 

})


app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  await myDataSource.query(
    `SELECT
      users.id AS name,
      posts.no AS no,
      title AS posting FROM posts
      INNER JOIN users
      ON users.no = posts.user_id WHERE users.no = ${id}

    `, (err, rows) => {

      posting = [];

      data = {
        userName : rows[0].name,
        userId : `${id}`,
        posting
      }

      for(let i in rows) {
        posting.push({
          no : rows[i].no,
          posting : rows[i].posting
        }) 
      }
      res.status(200).json( data );
    })
});

app.patch('/posts', async(req, res) => {
  const { editPost, post_no, user_id } = req.body;
    await myDataSource.query(
      `UPDATE posts 
      SET post = ? 
      WHERE 
      posts.user_id = ${user_id}
      AND  posts.no = ${post_no} 
      `,      
      [editPost, post_no, user_id]
    )

    await myDataSource.query(
      `SELECT
      p.no,
      p.user_id,
      p.title,
      p.post
      FROM posts p
      WHERE p.no=${post_no}`,
      (err, rows) => {
        res.status(200).json( { data : rows , message : "edit Success"}  )
      })
});


app.delete('/post/:no', async(req, res) => {
  const { no } = req.params;
  
  await myDataSource.query(
    `DELETE FROM posts
    WHERE posts.no = ${no}
    `
  )
  res.status(204).json({ message: 'postingDeleted' })
});

app.patch('/like/:post_no', async(req, res) => {
  const { post_no } = req.params;

  await myDataSource.query(
    `UPDATE posts SET likes = likes + 1 WHERE posts.no = ${post_no}`,

      res.status(200).json({ message : "likeCreated"})

  )

})


const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
}
start();