class NoticiasDAO {
    constructor(connection) {
        this._connection = connection;
    }
    getNoticias(callback) {
        this._connection.query('select * from noticias order by data_criacao desc', callback);
    }
    getNoticia(id, callback) {
        this._connection.query('select * from noticias where id_noticia = ?', id, callback);
    }
    salvarNoticia(noticia, callback) {
        this._connection.query('insert into noticias set ?', noticia, callback);
    }
    getTopFiveNoticias(callback) {
        this._connection.query('select * from noticias order by data_criacao desc limit 5',callback);
    }
}

module.exports = function() {
    return NoticiasDAO;
}