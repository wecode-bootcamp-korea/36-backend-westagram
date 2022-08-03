const express = require('express');
const app = express();
app.use(express.json());

const morgan = require('morgan');
app.use(morgan('combined'));

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const {DataSource} = require('typeorm');
const port = process.env.PORT;
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
            .then(() =>
                {console.log('Data Source has been initialized!')}
              );

// health check
app.get('/ping', function (req, res, next) {
  res.json({message: 'pong'});
});

// POST users
app.post('/users', async (req, res) => {
  const {name, gender, birth, contact, mbti} = req.body;

  await myDataSource.query(
    `INSERT INTO users(
      name,
      gender,
      birth,
      contact,
      mbti
    ) VALUES (?, ?, ?, ?, ?);`, [name, gender, birth, contact, mbti]);

    res.status(201).json({message: 'userCreated'});
  });

// POST posts
app.post('/posts', async (req, res) => {
 const {title, content, user_id} = req.body;

 await myDataSource.query(
   `INSERT INTO posts(
     title,
     content,
     user_id
   ) VALUES (?, ?, ?);`,
   [title, content, user_id]);

   res.status(202).json({message: 'postCreated'});
 });

// GET posts
app.get('/posts', async (req, res) => {
  await myDataSource.query(
    `SELECT
      *
    FROM posts`, (err, rows) => {
      res.status(200).json(rows);
    });
});

// GET posts of specific user_id
app.get('/posts/:user_id', async (req, res) => {
  const userId = req.params['user_id'];

  await myDataSource.query(
    `SELECT
      p.post_id,
      p.title,
      p.content,
      p.created_at,
      p.updated_at
    FROM posts p
    WHERE user_id=${userId}`, (err, rows) => {
      let postings = JSON.parse(JSON.stringify(rows));
      let data = new Object();
      data['user_id'] = userId;
      data['user_postings'] = postings;
      res.status(200).send(data);
  });
});


// PUT new data to specific posts row after GET post
//var updatePartOne = express.Router();
app.put('/updatePosts', async (req, res) => {
//  const postId = req.params['post_id'];
//  const userId = req.params['user_id'];
  const {title, content, postId, userId} = req.body;

  await myDataSource.query(
    `UPDATE posts
        SET
          title = ?,
          content = ?,
          user_id = ?
        WHERE post_id = ?
        AND user_id = ?`,
        [title, content, userId, postId, userId]);

  res.status(201).json({message: 'successfully updated'})
});
/*
var updatePartTwo = express.Router();
updatePartTwo.get('/updatePosts', async (req, res) => {
  const postId = req.params['postId'];
  const userId = req.params['userId'];
  const new_userId = req.params['new_user_id']

  await myDataSource.query(
    `SELECT
      p.title,
      p.content,
      p.user_id,
      p.post_id,
      u.name
    FROM posts p
    INNER JOIN users u
    ON p.user_id = ${new_userId}
    AND p.post_id = ${postId}`, (err, rows) => {
      res.status(204).json(rows);
    });
});

app.use(updatePartOne, updatePartTwo);
*/

// npm start
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
