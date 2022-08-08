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

app.get('/ping', function (req, res, next) {
  res.json({message: 'pong'});
});

app.post('/users', async (req, res) => {
  const {name, gender, birth, contact, mbti} = req.body;

  await myDataSource.query(
    `INSERT INTO users(
      name,
      gender,
      birth,
      contact,
      mbti
    ) VALUES (?, ?, ?, ?, ?);
    `, 
    [name, gender, birth, contact, mbti]);

    res.status(201).json({message: 'userCreated'});
  });

app.post('/posts', async (req, res) => {
 const {title, content, user_id} = req.body;

 await myDataSource.query(
   `INSERT INTO posts(
     title,
     content,
     user_id
   ) VALUES (?, ?, ?);
   `,
   [title, content, user_id]);

   res.status(201).json({message: 'postCreated'});
 });

app.get('/posts', async (req, res) => {
  await myDataSource.query(
    `SELECT
      p.id,
      p.title,
      p.content,
      p.user_id,
      p.created_at,
      p.updated_at
    FROM posts p`, (err, rows) => {
      res.status(200).json(rows);
    });
});

app.get('/posts/:user_id', async (req, res) => {
  const userId = req.params['user_id'];

  await myDataSource.query(
    `SELECT
      p.id,
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

app.put('/posts', async (req, res) => {
  const {title, content, postId, userId} = req.body;

  await myDataSource.query(
    `UPDATE posts
        SET
          title = ?,
          content = ?
        WHERE id = ?
        AND user_id = ?
        `,
        [title, content, postId, userId]
      );

  const data = await myDataSource.query(
                 `SELECT
                   p.title,
                   p.content,
                   p.user_id,
                   p.id,
                   u.name
                 FROM posts p
                 INNER JOIN users u
                 ON p.user_id=u.id
                 WHERE p.user_id=${userId} AND p.id=${postId}
  `);

  res.status(200).json(data);
});

app.delete('/posts/:postId', async (req,res) => {
  const {postId} = req.params;

  await myDataSource.query(
    `DELETE FROM posts
    WHERE posts.id=${postId}`
  );

  res.status(200).json({message: "postingDeleted"});
});

app.post('/like', async (req, res) => {
  const {userId, postId} = req.body;

  await myDataSource.query(
    `INSERT INTO likes(
        user_id,
        post_id
    ) VALUES (?, ?)
    `, 
    [userId, postId]);

  res.status(202).json({message: 'likeCreated'});
});

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
