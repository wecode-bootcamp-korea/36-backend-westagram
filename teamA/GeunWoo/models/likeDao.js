const createLikes = async (user_id, post_id) => {
    try {
        const createLike = await myDataSource.query(
                            `INSERT INTO likes(
                                user_id,
                                post_id
                            ) VALUES (?, ?);
                            `,
                            [user_id, post_id]
        );

    } catch (err) {
        const error = new Error('INVALID_IDs');
        error.statusCode = 500;
        throw error;
    }
};

const getLikesByUserId = async(user_id, post_id) => {
    try {
        return await myDataSource.query(
                `SELECT
                    l.user_id,
                    l.post_id
                FROM likes l
                WHERE l.user_id=?
                AND l.post_id=?
                `,
                [user_id, post_id]
        );
    } catch (err) {
        const error = new Error('INVALID_COMBINATION_OF_IDs');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    createLikes,
    getLikesByUserId
} 