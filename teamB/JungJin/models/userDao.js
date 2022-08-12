const { database } = require('./database');

const createUser = (name, email, profile_image, password) => {
    try {
        return database.query(`
        INSERT INTO users(
            name, 
            email, 
            profile_image, 
            password
        ) VALUES (?, ?, ?, ?)`, 
        [name, email, profile_image, password]
    ) 
    }
    catch (err) {    
        throw new Error('INVALID_DATA_INPUT')
    }
};

const lookupUser = async (query) => {
    try {
        const keys = Object.keys(query)
        const values = Object.values(query)
        const sql = await database.query(`
                        SELECT 
                            id, 
                            name, 
                            email, 
                            profile_image, 
                            password, 
                            created_at, 
                            updated_at 
                        FROM users`
                    )
        const objkeys = Object.keys(sql[0])
        if(keys.includes('offset') && keys.includes('limit')){
            return database.query(`
                SELECT 
                    id, 
                    name, 
                    email, 
                    profile_image, 
                    password, 
                    created_at, 
                    updated_at 
                FROM users
                LIMIT ${Number(values[1])} OFFSET ${Number(values[0])}`
            )
        }
        else if(keys.includes('ordering')){
            if(values[0].charAt(0) === '-'){
                return database.query(`
                    SELECT 
                        id, 
                        name, 
                        email, 
                        profile_image, 
                        password, 
                        created_at, 
                        updated_at 
                    FROM users
                    ORDER BY ${values[0].substr(1)} DESC`
                )
            }
            else {
                return database.query(`
                    SELECT 
                        id, 
                        name, 
                        email, 
                        profile_image, 
                        password, 
                        created_at, 
                        updated_at 
                    FROM users
                    ORDER BY ${values[0]}`
                )
            }
        }
        else if(keys.includes('search')){
            return database.query(`
                SELECT 
                    id, 
                    name, 
                    email, 
                    profile_image, 
                    password, 
                    created_at, 
                    updated_at 
                FROM users
                WHERE CONCAT(
                    id,
                    name,
                    email,
                    profile_image,
                    password, 
                    created_at,  
                    updated_at) 
                    REGEXP "${values[0]}"`
            )
        }
        else if(objkeys.filter(x => keys.includes(x)).length >= 1){
            if(objkeys.filter(x => keys.includes(x)).length === 2){
                return database.query(`
                    SELECT 
                        id, 
                        name, 
                        email, 
                        profile_image, 
                        password, 
                        created_at, 
                        updated_at 
                    FROM users
                    WHERE ${keys[0]} LIKE '${values[0]}' 
                    AND ${keys[1]} LIKE '${values[1]}'`
                )
            }
            else {
                return database.query(`
                    SELECT 
                        id, 
                        name, 
                        email, 
                        profile_image, 
                        password, 
                        created_at, 
                        updated_at 
                    FROM users
                    WHERE ${keys[0]} LIKE '${values[0]}'`
                )
            }
        }
        else {
            return database.query(`
                SELECT 
                    id, 
                    name, 
                    email, 
                    profile_image, 
                    password, 
                    created_at, 
                    updated_at 
                FROM users`
            )
        }
    }
    catch (err) {
        throw new Error('bad request')
    }
};

const loginUser = (email) => {
    return database.query(`
        SELECT 
            password
        FROM users
        WHERE email = '${email}'`
    )
}

module.exports = {
    createUser, lookupUser, loginUser
}