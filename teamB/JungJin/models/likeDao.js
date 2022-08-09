const { database } = require('./database');

const lookupLike = () => {
    return database.query(`
        SELECT 
            users.id AS userId, 
            users.name AS heartname, 
            posts.id AS postsId, 
            posts.title AS hearttitle 
        FROM users 
        INNER JOIN likes ON users.id = likes.user_id 
        INNER JOIN posts ON likes.post_id = posts.id 
        ORDER BY users.id, posts.id`
    )
};

const makeheart = async (user_id, post_id) => {
    const usersql = await database.query(`
                        SELECT EXISTS(
                            SELECT 
                                id 
                            from users 
                            WHERE users.id=${user_id}
                            ) AS RESULT`)
    const postsql = await database.query(`
                        SELECT EXISTS(
                            SELECT 
                                id 
                            from posts 
                            WHERE posts.id=${post_id}
                            ) AS RESULT`)
    const allsql = await database.query(`
                            SELECT EXISTS(
                                SELECT 
                                    user_id,
                                    post_id  
                                from likes 
                                WHERE user_id=${user_id} AND
                                    post_id=${post_id}
                                ) AS RESULT`)
    if(Number(Object.values(usersql[0])[0]) === 0 || 
        Number(Object.values(postsql[0])[0]) === 0){
        const err = new Error('no user.id OR posts.id')
        err.statusCode = 400
        throw err;
    }
    if(Number(Object.values(allsql[0])[0]) === 1){
        const err = new Error('already exists heart')
        err.statusCode = 400
        throw err;
    } 
    return database.query(`
        INSERT INTO likes(
            user_id,
            post_id
        ) VALUES (?, ?)`, 
        [user_id, post_id]  
    )
};

module.exports = {
    lookupLike, makeheart
}