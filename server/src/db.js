import mysql from 'mysql';

let connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'huploaddb',
    user: process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || undefined,
    port: process.env.DB_PORT || undefined
});

connection.connect(function (err) {
    if (err)
        return console.error('error to database connecting: ' + err.stack);

    console.log('Database connected, thread Id: ' + connection.threadId);
});

export default connection;