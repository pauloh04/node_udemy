var mysql = require('mysql');

var connectMysql = function() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'portal_noticias'
    });
}

module.exports = function() {
    return connectMysql;
}