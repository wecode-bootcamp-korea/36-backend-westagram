const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const { DataSource } = require('typeorm');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));


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
    console.log("Data source has been initialized!");
})
.catch((err) => {
    console.error("Error during Data Source initialization", err);
    myDataSource.destroy();
})

// health check
// http -v GET 127.0.0.1:3000/ping
app.get("/ping", (req, res) => {
    res.status(200).json({"message" : "pong"});
});

// database connection check
// http -v POST 127.0.0.1:3000/ping id:=1 name="test name" email="test@email"
app.post("/ping", async(req, res, next) => {
    const { id, name, email } = req.body;

    await myDataSource.query(
        `INSERT INTO test_table(
            id,
            name,
            email
        ) VALUES (?, ?, ?);
        `,
        [id, name, email]
    );

    res.status(201).json({ message : "successfully created!"});
});

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.error(err);
    }
};

start();