const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config()

const { DataSource, OneToMany } = require('typeorm');

const database = new DataSource({
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

database.initialize()
  .then(() => {
    console.log("Data Source has been initialized");
  })

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get("/ping", (req,res) => {
  res.json({ message: "pong"});
});


//singup
app.post('/users', async (req, res, next) => {
  const { name, email, profile_image, password } = req.body;

  await database.query(
      `INSERT INTO users(
          name,
          email,
          profile_image,
          password
      ) VALUES (?, ?, ?, ?);
      `,
      [name, email, profile_image, password]);

      res.status(200).json({ message : "userCreated"});
});

//users list
app.get('/users-list', async (req, res) => {
  await database.query(
      `SELECT
          name,
          email,
          profile_image,
          password
          FROM users;`)
        
      res.status(200).json(rows);
    ;
  });

//게시글posts
app.post('/post', async (req, res, next) => {
  const {user_id, user_profile_image, image_url, Content} = req.body;

  await database.query (
      `INSERT INTO posts(
        user_id,
        user_profile_image,
        image_url,
        content
      ) VALUES (?, ?, ?, ?);
      `,
      [user_id, user_profile_image, image_url, Content]);

      res.status(201).json({ message : "postCr eated"});
});

//전체게시글 조회
app.get('/posts-list', async(req, res) => {
  const postslist = await database.query(
  `SELECT 
    u.id userId,
    u.profile_image userProfileImage,
    p.user_id postingId,
    p.image_url postingImageUrl,
    p.content postingContent
    FROM posts p
    INNER JOIN users u
    ON u.id = p.user_id;`
  )
    res.status(200).json({ data : postslist });
  });


//유저게시글 조회 - 진행중
/*app.get('/get/posts/:userId', async (req, res) => {
  const { userId } = req.params;
  const data = await database.query(
      `SELECT
        p.postingContent,
        p.userId
        FROM posts p
        WHERE p.userId = ${userId}
      `);
  let obj = {
      "1.userId": `${userId}`,
      "2.name": parseInt(
         await dayabase.query(`select u.name from userId u`)) //쿼리문 삽입으로해결 방안 찾기
      // userProfileImage: parseInt(profile_Image)
  };
  obj["postings"] = data;
  res.status(200).json({ "data": obj })

});
*/ 

//게시글 수정
app.patch('/patch/:userId/:postId', (req, res) => {
  const { userId, postId } = req.params;
  const { title, content } = req.body;
  database.query(
      `UPDATE posts
      SET
          title = "${title}",
          content = "${content}"
      WHERE id = ${postId};`)

  database.query(
      `SELECT
              u.id as userId,
              u.name as userName,
              p.id as postingId,
              p.title as postingTitle,
              p.content as postingContent
      FROM users u, posts p
      WHERE u.id = ${userId} AND p.id = ${postId};
      `,(err,rows) => {
          res.status(201).json({ data : rows });
      });
});

//게시글 삭제
app.delete("/delete/post/:userId", async (req, res) => {
  const { postingId } = req.params;

  await database.query(
      `DELETE FROM posts
       WHERE posts.id = ${postingId}`
  );
  res.status(200).json({ message: "postingDeleted" });
}); 
 
const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
}

start();






//http -v POST 127.0.0.1:3000/posts userId="1" userProfileImage="1.url" postingId="1" postingImageUrl="img" postingContent="1번"