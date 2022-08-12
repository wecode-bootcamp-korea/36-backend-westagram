const express = require('express');
const app = express();
app.use(express.json());

const morgan = require('morgan');
app.use(morgan('combined'));

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT;
const routes = require('./routes');

app.use(routes);


app.get('/ping', function (req, res, next) {
  res.json({message: 'pong'});
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
