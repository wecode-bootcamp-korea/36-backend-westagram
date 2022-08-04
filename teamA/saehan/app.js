const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    });
const PORT = process.env.PORT;


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.get('/ping', function (req, res) {
  res.status(200).json({message: 'pong'})
})
 
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.error(err);
    }
};

start();