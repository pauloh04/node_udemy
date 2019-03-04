module.exports = function(app){
    app.get('/noticia', function(req,res){
        
        var noticiasModel = new app.app.models.NoticiasDAO(app.config.dbConnection());

        noticiasModel.getNoticia(function(error, result){
            res.render('noticias/noticia', { noticia: result });
        });
        
    });
};