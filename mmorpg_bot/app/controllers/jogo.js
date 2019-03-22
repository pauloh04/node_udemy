module.exports.jogo = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send("Usuário precisa fazer login");
        return;
    }

    var msg = '';

    if(req.query.msg != ''){
        msg = req.query.msg;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.iniciaJogo(res, usuario, casa, msg);
}

module.exports.sair = function(application, req, res){
    req.session.destroy(function(err){
        res.render("index", {validacao: {}});
    });
}

module.exports.aldeoes = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send("Usuário precisa fazer login");
        return;
    }

    res.render("aldeoes", {validacao: {}});
}


module.exports.ordenarAcaoAldeao = function(application, req, res){

    if(req.session.autorizado !== true){
        res.send("Usuário precisa fazer login");
        return;
    }
    
    var dadosForm = req.body;
    
    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.redirect('/jogo?msg=A');
        return;
    }

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    dadosForm.usuario = req.session.usuario;

    JogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B')
}

module.exports.pergaminhos = function(application, req, res){

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.getAcoes(res, req.session.usuario);
}

module.exports.revogar_acao = function(application, req, res){

    var _id = req.query.id;
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);
    JogoDAO.revogarAcao(res, _id);
}