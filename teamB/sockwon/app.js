const http = require("http");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv = require("dotenv");
dotenv.config()

const routes = require("./routes");
const app = express();

const appDataSource = require('./models/dataSource')
appDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error occurred during Data Source initialization", err);
      appDataSource.destroy();
    });

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong"});
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};
start();