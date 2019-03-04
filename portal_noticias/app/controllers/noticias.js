module.exports.noticias = function(app, req, res) {
    var noticiasModel = new app.app.models.NoticiasDAO(app.config.dbConnection());
    noticiasModel.getNoticias(function(error, result){
        res.render('noticias/noticias', { noticias: result });
    });
}

module.exports.noticia = function(app, req, res) {
    var noticiasModel = new app.app.models.NoticiasDAO(app.config.dbConnection());
    noticiasModel.getNoticia(req.query.id, function(error, result){
        res.render('noticias/noticia', { noticia: result });
    });
}