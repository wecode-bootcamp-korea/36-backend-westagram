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
  const { title, description } = req.body;

  await myDataSource.query(`
    INSERT INTO posts (
      title, 
      description
    ) VALUES (?, ?);`,
    [title, description]
  );

  res.status(201).json({ message: "New Post Created!" });
});

// POST post
app.post("/posts", async (req, res, next) => {
  const { title, description } = req.body;

  await myDataSource.query(`
    INSERT INTO posts (
      title, 
      description
    ) VALUES (?, ?);`,
    [title, description]
  );

  res.status(201).json({ message: "New Post Created!" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const serverListening = () =>
  console.log(`💫 Server listening on port http://localhost:${PORT} ⛱`);

server.listen(PORT, serverListening);
