const { DataSource } = require('typeorm');

const Database = new DataSource({
	type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

const initialize = Database
    .initialize()
    .then(() => {
      console.log("DataSource has been initialized!");
    })
    .catch((err) => {
      console.error("Error occurred during Data Source initialization", err);
      myDataSource.destroy();
    });

    module.exports = {
        Database,
        initialize,
    }