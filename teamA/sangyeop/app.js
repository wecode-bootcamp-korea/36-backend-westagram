const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config()

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
  type: 'mysql',
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
app.use(morgan('dev'));

app.get("/ping", (req,res) => {
  res.json({ message: "pong"});
});


//singup
app.post('/userId', async (req, res, next) => {
  const { name, email, profileImage, password } = req.body;

  await myDataSource.query(
      `INSERT INTO userId(
          name,
          email,
          profile_Image,
          password
      ) VALUES (?, ?, ?, ?);
      `,
      [name, email, profileImage, password]);

      res.status(200).json({ message : "userCreated"});
});


app.get('/get/userId', async (req, res, next) => {
  await myDataSource.query(
      `SELECT
          name,
          email,
          profile_Image,
          password
          FROM userId;`
          ,(err, rows) =>{

      res.status(200).json(rows);
    });
  });
  


//게시글posts
app.post('/posts', async (req, res, next) => {
  const { userId, userProfileImage, postingId, postingImageUrl, postingContent} = req.body;

  await myDataSource.query (
      `INSERT INTO posts(
          userId,
          userProfileImage,
          postingId,
          postingImageUrl,
          postingContent
      ) VALUES (?, ?, ?, ?, ?);
      `,
      [userId, userProfileImage, postingId, postingImageUrl, postingContent]);

      res.status(201).json({ message : "postCreated"});
});

//전체게시글 조회
app.get('/get/posts', async(req, res, next) => {
  await myDataSource.query(
  `SELECT 
    userId,
    userProfileImage,
    postingId,
    postingImageUrl,
    postingContent
    FROM posts`
  ,(err, rows) => {
    res.status(200).json(rows);
});
});

//유저게시글 조회 - 진행중
app.get('/get/posts/:userId', async (req, res) => {
  const { userId } = req.params;
  const data = await myDataSource.query(
      `SELECT
              p.id as postingId,
              p.postingId,
              p.postingContent,
              p.userId
      FROM posts p
      WHERE p.userId = ${userId}
      `);
  let obj = {
      "1.userId": `${userId}`,
      "2.name": parseInt(
         await myDataSource.query(`select u.name from userId u`)) //쿼리문 삽입으로해결 방안 찾기
      // userProfileImage: parseInt(profile_Image)
  };
  obj["postings"] = data;
  res.status(200).json({ "data": obj })

});

//게시글 수정
app.patch('/patch/posts/:id', function(req, res){
  const id = req.params.id
  const content = req.body.content
  myDataSource.query(`
      UPDATE posts 
          SET ? WHERE id = ${id}`, 
          {postingContent :content}
      )

  res.status(201).json({message: "UpdatedSuccess"});
})



//게시글 삭제
app.delete("/delete/posts/:postingId", async (req, res) => {
  const { postingId } = req.params;

  await myDataSource.query(
      `DELETE FROM posts
      WHERE posts.id = ${postingId}`
  );
  res.status(200).json({ message: "postingDeleted " });
}); 
 


//좋아요




const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
}

start();






//http -v POST 127.0.0.1:3000/posts userId="1" userProfileImage="1.url" postingId="1" postingImageUrl="img" postingContent="1번"