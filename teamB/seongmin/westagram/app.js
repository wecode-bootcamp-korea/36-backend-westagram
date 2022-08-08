const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT;

const routes = require('./routes/idex');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

app.get('/ping', (req, res)=> {
    res.json({message : 'pong'});
})

app.listen(PORT, ()=> {
    console.log('server start!!');
});