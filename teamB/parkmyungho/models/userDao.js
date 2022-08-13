
const {DataSource} = require('typeorm');

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
    .then(()=>{
        console.log("Data Source has been initialized!");
    })
    .catch((err)=>{
        console.error("Error occurred during Data Source initialization", err);
        appDataSource.destroy();
    });

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
    const [user] = await appDataSource.query( 
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
  
    return user;
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