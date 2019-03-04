module.exports.index = function(app, req, res) {

    var noticiasModel = new app.app.models.NoticiasDAO(app.config.dbConnection());

    noticiasModel.getTopFiveNoticias(function(error, result){
        res.render('home/index', { noticias: result });
    });
}