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

//게시글posts
app.post('/posts', async (req, res, next) => {
  const { userId, userProfileImage, postingId, postingImageUrl, postingContent} = req.body;

  await myDataSource.query(
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

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
}

start();






//http -v POST 127.0.0.1:3000/posts userId="1" userProfileImage="1.url" postingId="1" postingImageUrl="img" postingContent="1번"