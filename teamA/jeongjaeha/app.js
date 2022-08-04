const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");


const dotenv = require("dotenv");
dotenv.config()

const { DataSource, SimpleConsoleLogger } = require('typeorm');
const { title } = require("process");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})


myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized");
  })

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

//health check
app.get("/ping", (req,res) => {
  res.status(200).json({ message: "pong"});
});

//Assignment 2 : 유저 회원가입 하기

app.post('/users', async (req, res) => {
  const { id, pw, name, age} = req.body

  await myDataSource.query(
    `INSERT INTO users(
      user_id,
      user_pw,
      user_name,
      user_age
    ) VALUES(?, ?, ?, ?);
    `, [ id, pw , name, age ]
  ) 
      res.status(200).json({ message: 'userCreated'})
});


//Assignment 3: 게시글 등록하기

app.post('/posts', async (req, res) => {
  const { no, title, post } = req.body

  await myDataSource.query(
    `INSERT INTO posts(
      users_no,
      post_title,
      post
    ) VALUES (?, ?, ?)
    `, [ no, title, post ]
  )
      res.status(200).json({ message: 'postCreated'})
})

//Assignment 4: 전체 게시글 조회하기

app.get('/posts/viewAll', async (req, res) => {
  await myDataSource.manager.query(
    `SELECT 
      users_no,
      post_title,
      post
       FROM posts`,
    (err, rows) => {
      res.status(200).json(rows)
    }
  ) 

})


//Assignment 5: 유저의 게시글 조회하기

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  await myDataSource.query(
    `SELECT
      users.user_id AS name,
      posts.no AS no,
      post_title AS posting FROM posts
      INNER JOIN users
      ON users.no = posts.users_no WHERE users.no = ${id}

    `, (err, rows) => {

      posting = [];

      data = {
        userName : rows[0].name,
        userId : `${id}`,
        posting
      }

      for(let i in rows) {
        posting.push({
          no : rows[i].no,
          posting : rows[i].posting
        }) 
      }
      res.status(200).json( data );
    })
});

//Assignment :6 유저의 게시글 수정하기

app.patch('/patch', async(req, res) => {
  const { post_no, editPost, users_no } = req.body;
    await myDataSource.query(
      `UPDATE posts SET post = ? WHERE posts.no = ${post_no} AND posts.users_no = ${users_no}
      `,      
      [editPost, users_no, post_no]
    )
    res.status(201).json({ message: 'Success'});

    // await myDataSource.query(
    //   `SELECT
    //   p.no,
    //   p.users_no,
    //   p.title,
    //   p.post
    //   FROM posts p`,
    //   (err, rows) => {
    //     res.status(200).json(rows )
    //   })
});



// app.patch('/patch', async(req, res) => {
//   const { user_no, post_no, update_post} = req.body;
//     await myDataSource.query(
//       `UPDATE posts 
//        SET post = ? 
//        WHERE posts.no = ${post_no} AND posts.users_no = ${user_no},

//        select * from posts;

//       ` 
//       ,(err, rows) => {

//         res.status(201).json({ rows });
//       }
//     );

// });

//create  book
app.post("/books", async (req, res, next) => {
  const { title, description, coverImage } = req.body

  await myDataSource.query(
    `INSERT INTO books(  
      title,
      description,
      cover_img
    ) VALUES(?, ?, ?);
    `,
    [ title, description, coverImage ]
  );

      res.status(200).json({ message: "successfully created"});
});

//create  authors
app.post("/authors", async (req, res, next) => {
  const { first_name, last_name, age } = req.body

  await myDataSource.query(
    `INSERT INTO authors(  
      first_name,
      last_name,
      age
    ) VALUES(?, ?, ?);
    `,
    [ first_name, last_name, age ]
  );

      res.status(201).json({ message: "successfully created"});
});

//create  books_authors
app.post("/books_authors", async (req, res, next) => {
  const { book_id, author_id, cover_img } = req.body

  await myDataSource.query(
    `INSERT INTO books_authors(  
      book_id,
      author_id,
      cover_img
    ) VALUES(?, ?, ?);
    `,
    [ book_id, author_id, cover_img ]
  );

      res.status(201).json({ message: "successfully created"});
});

//get all books
app.get('/books', async (req, res) => {
  await myDataSource.manager.query(
    `SELECT
      b.id,
      b.title,
      b.description,
      b.cover_img
    FROM books b`
    ,(err, rows) => {
      res.status(200).json(rows);
       })
});

//GET all books along with authors
app.get('/books-with-authors' ,async (req, res) => {
  await myDataSource.query(
    `SELECT
      books.id,
      books.title,
      books.description,
      books.cover_Img,
      authors.first_name,
      authors.last_name,
      authors.age
    FROM books_authors ba
    INNER JOIN authors ON ba.authors_id = authors.id
    INNER JOIN books ON ba.books_id = books.id`
    ,(err, rows) => {
      res.status(200).json(rows);
    })
});

// Update a single book by its primary ket
app.patch('/books', async(req, res) => {
  const { title, description, coverImage, bookId } = req.body

  await myDataSource.query(
    `UPDATE books
    SET
      title =?,
      description =?,
      cover_img =?
      WHERE id = ?
      `,
      [ title, description, coverImage, bookId ]
  );
    res.status(201).json({ });
});


//Delete a book

app.delete('/books/:bookId', async(req, res) => {
  const {bookId } = req.params;
  
  await myDataSource.query(
    `DELETE FROM books
    WHERE books.id = ${bookId}
    `
  );
  res.status(204).json();
});



const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
}
start();