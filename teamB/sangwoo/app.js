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
    database: process.env.TYPEORM_DATABASE
});

myDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialize");
});

app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// health check
app.get("/ping", (reg, res) => {
    res.status(201).json({ message: "pong" });
});

// 회원가입 엔드포인트
app.post("/sign-up", async (req, res) => {
    const { name, email, password, profile_image } = req.body;

    await myDataSource.query(
        ` 
        INSERT INTO users(
            name,
            email,
            password,
            profile_image
        ) VALUES (?,?,?,?);
        `,
        [name, email, password, profile_image]
    );
    res.status(201).json({ message: "userCreated" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
