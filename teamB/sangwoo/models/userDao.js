const database = require('./dataSource');

const createUser = async ( name, email, password, profile_image ) => {
        const user = await database.query(
            `INSERT INTO users(
                name,
                email,
                password,
                profile_image
            ) VALUES(?, ?, ?, ?)
            `,
            [ name, email, password, profile_image ]
        )
        return user;
}



const userEmail = async ( email ) => {
    const [user] = await database.query(
    `
        SELECT *
        FROM users u
        WHERE u.email = ?
    `,
    [ email ]
    );
    return user;
};

module.exports = {
    createUser,
    userEmail
}

