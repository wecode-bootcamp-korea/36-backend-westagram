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

myDataSource
  .initialize()
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
    `INSERT INTO users(
      name, email, password
    ) VALUES (?, ?, ?);`,
    [name, email, password]
  );
  res.status(201).json({ message: "userCreated" });
});

//posts
app.post("/posts", async (req, res, next) => {
  const { title, content } = req.body;

  await myDataSource.query(
    `INSERT INTO posts(
      title, content
    ) VALUES (?, ?);`,
    [title, content]
  );
  res.status(201).json({ message: "postCreated" });
});

//posts list
app.get("/posts/list", async (req, res, next) => {
  await myDataSource.query(
    `SELECT u.id as "userId", u.name as "userName", p.id as "postingId", p.title as "postingTitle", p.content as "postingContent" FROM users u inner join posts_users pu on u.id = pu.user_id inner join
    posts p on pu.post_id = p.id order by u.id;`,
    (error, rows) => {
      res.status(200).json({ "data" : rows });
    }
  );
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
