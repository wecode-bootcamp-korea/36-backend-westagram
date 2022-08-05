const dotenv = require("dotenv");
dotenv.config()

const http = require("http");

const express = require("express");
const cors = require ("cors");
const morgan = require ("morgan");
const { DataSource } = require('typeorm');

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
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
        myDataSource.destroy();})
const app = express()

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get("/ping", (req, res)=> {
    res.status(200).json({ "message" :"pong"});
});

app.post('/users', async (req, res) => {
    const {name, birth, contact, password} = req.body;
    await myDataSource.query(
        `INSERT INTO users_table(
            name,
            birth,
            contact,
            password
        ) VALUES (?, ?, ?, ?); `,
        [name, birth, contact, password]
    );
    res.status(201).json({message: "userCreated"});
})

app.post('/posts', async (req, res) => {
    const {title, content, user_id, userProfileImage, postingImageUrl} = req.body;
    await myDataSource.query(
        `INSERT INTO posts(
            title,
            content,
            user_id,
            userProfileImage,
            postingImageUrl
        ) VALUES (?, ?, ?, ? ,?); `,
        [title, content, user_id, userProfileImage, postingImageUrl]
    );
    res.status(201).json({message: "postCreated"});
});

app.get('/lists', async (req, res) => {
    await myDataSource.query(
        `SELECT
            id,
            title,
            content,
            user_id,
            userProfileImage,
            postingImageUrl
        FROM posts `,
        (err, rows) => {res.status(200).json({data:rows})
})})

app.get('/userlists/:id', async(req, res)=>{
    const receiveId =req.params.id;
    await myDataSource.query(
        `SELECT 
            p.userProfileImage, 
            p.content As postingContent,
            p.postingImageUrl,
            u.id As userId,
            p.id As postingId,
            p.title from posts p
            inner join users_table u on p.user_id = u.id
            where user_id = ${receiveId}`,
        (err, rows) => {
        let data = {
            userId: `${receiveId}`,
            userProfileImage: rows[0].userProfileImage,
            posting:[]
        }
        for(let i in rows){
            data.posting.push({
                postingId: `${receiveId}`,
                postingImageUrl: rows[i].postingImageUrl,
                postingContent: rows[i].postingContent
            })
        }
        res.status(200).json({data : data});
    })
})

app.patch('/userPost/:postId', async(req, res) => {
    const postingId = req.params.postId;
    const {title, content} = req.body;
    await myDataSource.query(
        `UPDATE posts
            SET 
            title = ?,
            content = ?
            WHERE posts.id = ${postingId}
        `, [title, content]
        )
    await myDataSource.query(
        `SELECT
            posts.user_id AS userId,
            users_table.name AS username,
            posts.id AS postingId,
            posts.title AS postingTitle,
            posts.content AS postingContent
        FROM users_table
        INNER JOIN posts ON users_table.id = posts.user_id
        WHERE posts.id = ${postingId}
        `,
        (err, rows)=>{
            res.status(201).json({data : rows});
         })
})

app.delete('/postDelete/:Id', async (req, res) => {
    const deletePost = req.params.Id;
    await myDataSource.query(
        `DELETE FROM posts WHERE id = ${deletePost};
        `)
        res.status(204).json({ message : "postingDeleted" });
});

app.post('/listHeart', async(req, res) => {
    const {user_id, post_id} = req.body
    await myDataSource.query(
		`INSERT INTO likes(
			user_id,
			post_id
		) VALUES (?, ?);
		`,
		[user_id, post_id]
	); 
    res.status(201).json({ message : "likeCreated" });
})

const server = http.createServer(app)
const PORT = process.env.PORT;
const start = async () => {
    server.listen(PORT, ()=> console.log(`server is listening on ${PORT}`))
}

start();