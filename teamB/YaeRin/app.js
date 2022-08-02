const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const { DataSource } = require("typeorm");
// DataSource는 데이터베이스 연결 설정을 유지하고 사용하는 RDBMS에 따라 초기 데이터베이스 연결 또는 연결 풀을 설정한다.

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});
// typeORM을 require하면서 만든 DataSource 변수를 메서드로서 실제 활용한다. 파일 .env속 환경변수를 연동시킨다.

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});
// typeORM 문법상 myDataSource.initialize()하는 순간 데이터베이스와의 연결과 연동을 실행한다. 비동기적인 형태로 이뤄지는데(외부 시스템과의 연동 상태이기때문), 이 비동기 처리를 promise객체를 활용해서 연결의 성공 여부에 따라 추후 행위를 정의하고 설정할 수 있다. 현재엔 받아들이기 다소 난해한 내용. 추후 error handling때 더 설명.
// then이라는 메서드 안에 필요한 행동을 정의한다. then은 initialize가 잘 동작됐을때 작동한다.

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;
// dotenv로 관리해야하는 환경변수로서 불러오기 위해 Process.env.port로 한다.

const serverListening = () =>
  console.log(`💫 Server listening on port http://localhost:${PORT} ⛱`);

server.listen(PORT, serverListening);

// http -v GET http://127.0.0.1:8000/ping
