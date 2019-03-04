module.exports.formulario_inclusao_noticia = function(app, req, res) {
    res.render('admin/form_add_noticia', {validacao: {}, noticia: {}});
}

module.exports.noticias_salvar = function(app, req, res) {
    var noticia = req.body;

    // validacoes de campos
    req.assert('titulo', 'Título é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10,100);
    req.assert('autor', 'Autor é obrigatório').notEmpty();
    req.assert('data_noticia', 'Data é obrigatória').notEmpty();
    req.assert('noticia', 'Notícia é obrigatória').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.render('admin/form_add_noticia', {validacao: errors, noticia: noticia});
        return;
    }

    var noticiasModel = new app.app.models.NoticiasDAO(app.config.dbConnection());

    noticiasModel.salvarNoticia(noticia, function(error, result){
        res.redirect('/noticias');
    });
}