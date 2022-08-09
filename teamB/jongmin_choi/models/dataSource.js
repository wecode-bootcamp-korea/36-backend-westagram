const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

const initialization = myDataSource.initialize()
.then(() => {
    console.log("Data source has been initialized!");
})
.catch((err) => {
    console.error("Error during Data Source initialization", err);
    myDataSource.destroy();
});

module.exports = {
    myDataSource,
    initialization
}
