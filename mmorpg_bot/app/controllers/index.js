module.exports.index = function(application, req, res){
    res.render('index', {validacao: {}});
}

module.exports.autenticar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('usuario', 'Usuário é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatório').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('index', {validacao: errors});
        return;
    }
    
    var connection = application.config.dbConnection;

    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    UsuariosDAO.autenticarUsuario(dadosForm, req, res);
}