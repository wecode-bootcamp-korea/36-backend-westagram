const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config(); // 참고하는 환경변수들보다 앞에 놓아야 함

const {DataSource} = require('typeorm')

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(()=>{
        console.log("Data Source has been initialized!")
    });

const app = express()

app.use(express.json());
app.use(cors());
app.use(morgan('dev')); //combined, tiny, dev에 따라서 실행했을 때 터미널에 나타나는 메시지가 다름

app.get("/ping", (req, res)=>{
    res.json({message: "pong"})
})

//books 라는 타겟으로 post라는 http메소드로 들어온 통신을 뒤에 있는 
//async비동기 함수로서 동작시킬 수 있게 화살표 함수로 나와 있는 것
//

//Create a book
app.post("/books",async(req, res, next)=>{
    //request body의 title, description, coverImage를 구조분해 핡당 받아서
    // 마치 변수처럼 활용
    const {title, description, coverImage} = req.body
    //console.log(req)
    await myDataSource.query(
        `INSERT INTO books(
            title,
            description,
            cover_image
        )VALUES (?,?,?);
        `,
        [title, description, coverImage]
    );
    res.status(201).json({message : "successfully created"});
})

//Get all books
//Manager 메소드? 도 있지만 그냥 해라! 
// httpie는 알파벳 순서로 불러옴
app.get('/books', async(req, res)=>{
    await myDataSource.manager.query(
        `SELECT 
            b.id,
            b.title,
            b.description,
            b.cover_image
        FROM books b`
        ,(err, rows)=>{
            res.status(200).json(rows);
        }
    )
})

//get all books along with authors
app.get('/books-with-authors', async (req, res)=>{
    await myDataSource.manager.query(
        `SELECT
                books.id,
                books.title,
                books.description,
                books.cover_image,
                authors.first_name,
                authors.last_name,
                authors.age
            FROM books_authors ba
            INNER JOIN authors ON ba.author_id = authors.id
            INNER JOIN books ON ba.book_id = books.id`
        ,(err, rows) => {
                res.status(200).json(rows);
        })
})

app.patch('/books', async(req, res)=>{
    const {title, description, coverImage, bookId} = req.body

    await myDataSource.query(
        `UPDATE books
        SET
            title =?,
            description = ?,
            cover_image = ?
        WHERE id = ?
        `,
        [title, description, coverImage, bookId]
    );
        res.status(201).json({message: "successfully updated"});
});

// Delete a book 3
app.delete('/books/:bookId', async(req,res)=>{
    const {bookId} = req.params;

    await myDataSource.query(
        `DELETE FROM books
        WHERE books.id = ${bookId}
        `);
        res.status(200).json({message:"successfully deleted"})
})

 

const server = http.createServer(app)
const PORT = process.env.PORT;

const start = async()=>{
    server.listen(PORT, ()=> console.log(`server is listening on ${PORT}`))
}

start()