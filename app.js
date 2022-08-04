const express = require('express');
const app = express();
app.use(express.json());

const morgan = require('morgan');
app.use(morgan('combined'));

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const {DataSource} = require('typeorm');
const port = process.env.PORT;
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
            .then(() =>
                {console.log('Data Source has been initialized!')}
              );

// health check
app.get('/ping', function (req, res, next) {
  res.json({message: 'pong'});
});

// POST users
app.post('/users', async (req, res) => {
  const {name, gender, birth, contact, mbti} = req.body;

  await myDataSource.query(
    `INSERT INTO users(
      name,
      gender,
      birth,
      contact,
      mbti
    ) VALUES (?, ?, ?, ?, ?);`, [name, gender, birth, contact, mbti]);

    res.status(201).json({message: 'userCreated'});
  });

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
