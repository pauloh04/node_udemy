module.exports.jogo = function(application, req, res){
    if(req.session.autorizado !== true){
        res.send("Usuário precisa fazer login");
        return;
    }

    var comando_invalido = 'N';

    if(req.query.comando_invalido == 'S'){
        comando_invalido = 'S';
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
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
        res.redirect('/jogo?comando_invalido=S');
        return;
    }

    res.send("Ok");
}


module.exports.pergaminhos = function(application, req, res){
    res.render("pergaminhos", {validacao: {}});
}