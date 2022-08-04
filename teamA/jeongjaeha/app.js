const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");


const dotenv = require("dotenv");
dotenv.config()

const { DataSource, SimpleConsoleLogger } = require('typeorm');
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
  const { id, pw, name, age} = req.body

  await myDataSource.query(
    `INSERT INTO users(
      user_id,
      user_pw,
      user_name,
      user_age
    ) VALUES(?, ?, ?, ?);
    `, [ id, pw , name, age ]
  ) 
      res.status(200).json({ message: 'userCreated'})
});


app.post('/posts', async (req, res) => {
  const { no, title, post } = req.body

  await myDataSource.query(
    `INSERT INTO posts(
      users_no,
      post_title,
      post
    ) VALUES (?, ?, ?)
    `, [ no, title, post ]
  )
      res.status(200).json({ message: 'postCreated'})
})


app.get('/posts/viewAll', async (req, res) => {
  await myDataSource.manager.query(
    `SELECT 
      users_no,
      post_title,
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
      users.user_id AS name,
      posts.no AS no,
      post_title AS posting FROM posts
      INNER JOIN users
      ON users.no = posts.users_no WHERE users.no = ${id}

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

app.patch('/patch', async(req, res) => {
  const { post_no, editPost, users_no } = req.body;
    await myDataSource.query(
      `UPDATE posts SET post = ? WHERE posts.no = ${post_no} AND posts.users_no = ${users_no}
      `,      
      [editPost, users_no, post_no]
    )

    await myDataSource.query(
      `SELECT
      p.no,
      p.users_no,
      p.title,
      p.post
      FROM posts p
      WHERE p.no=${users_no}`,
      (err, rows) => {
        res.status(200).json( {data :rows} )
      })
});


app.delete('/postDelete/:no', async(req, res) => {
  const { no } = req.params;
  
  await myDataSource.query(
    `DELETE FROM posts
    WHERE posts.no = ${no}
    `
  )
  res.status(204).json({ message: 'postingDeleted' })
});


const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
}
start();