
const {appDataSource} = require("./dataSource")

const createUser = async(name, email, profileImage, password)=>{
    try {
        return await appDataSource.query(
            `INSERT INTO users(
                name,
                email,
                profile_image,
                password
            ) VALUES (?,?,?,?);
            `,
            [name, email, profileImage, password] 
        );
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getUserByEmail = async (email) => {
    return await appDataSource.query( 
      ` SELECT
            u.id,
            u.name,
            u.email,
            u.profile_image,
            u.password,
            u.created_at,
            u.updated_at
        FROM users u
        WHERE u.email = ?
      `,
      [email]
    );
  };

const getUserByUserId = async(userId) =>{
    const [user] = await appDataSource.query(
        `SELECT
            u.id,
            u.name,
            u.email,
            u.profile_image,
            u.password,
            u.created_at,
            u.updated_at
        FROM users u
        WHERE u.id = ?`
        , [userId]
    );
    return user;
}

const createLike = async(userId, postId) =>{
    try{
        await appDataSource.query(
        `INSERT INTO likes(
            user_id,
            post_id
        )
        VALUES (?,?)
        `
       , [userId, postId]
        );
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
   createUser,
   getUserByEmail,
   getUserByUserId,
   createLike   
}