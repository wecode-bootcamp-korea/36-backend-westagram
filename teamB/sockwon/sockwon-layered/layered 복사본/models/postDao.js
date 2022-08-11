const appDataSource = require("./dataSource");
const bcrypt = require("../middleware/bcypt");
const jwt = require("../middleware/jwt");

const createPost = (title, content, id)=>{
    try {
        return appDataSource.query(
        `INSERT INTO posts (
            title,
            content,
            user_id
            ) VALUES( ?, ?, ? );
        `,
        [title, content, id]
    );
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT! by Lee');
		error.statusCode = 500;
		throw error;
    }
}

const getAllPost = async (user_id)=>{
    
    try {
        const temp = await appDataSource.query(
            `
            SELECT * 
            FROM posts
            WHERE posts.user_id = ${user_id}
            `
        );
        return temp
    }catch(err){
        const error = new Error("INVALID GETTER!");
        error.statusCode = 500;
        throw error;
    }
}

const deletePost = async (postId)=>{
    try{
        return await appDataSource.query(
            `
            DELETE 
            FROM posts
            WHERE posts.id = ?
            `, [postId]
        )
    }catch(err){
        console.log(err)
        const error = new Error("INVALID GETTER!");
        error.statusCode = 500;
        throw error;
    }
}

const patchPost = (title, content, postId)=>{

    try{
        return appDataSource.query(
            `
            UPDATE posts 
            SET title="${title}", 
            content="${content}" 
            WHERE id=${postId};
            `
        )
    }catch(err){
        const error = new Error("INVALID GETTER!");
        error.statusCode = 500;
        throw error;
    }
}

const logIn = async (email, password)=>{

    try{
        const userInfo = await appDataSource.query(
            `
            SELECT
            users.id,
            users.email,
            users.password
            FROM users
            WHERE users.email = "${email}"
            `
        )
        const temp = userInfo[0].password
        const payLoad = {email : userInfo[0].email, id : userInfo[0].id}

        const auth = await bcrypt.verifyHash(password, temp)
        if(auth){
            const jwtToken = jwt.newJwt(payLoad)
            return jwtToken
        }
        else{
            return auth;
        }
    }catch(err){
        const error = new Error("login Failed!");
        error.statusCode = 401;
        throw error;
    }
}

module.exports = {
    createPost, getAllPost, deletePost, patchPost, logIn
}
