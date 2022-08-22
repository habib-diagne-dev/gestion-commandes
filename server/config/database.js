let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'toor',
    password: 'Bouy@579',
    database: 'lasa_gestion_commandes'
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});

module.exports = connection