module.exports.cadastro = function(application, req, res){
    res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('usuario', 'Usuario é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatório').notEmpty();
    req.assert('casa', 'Casa é obrigatório').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('cadastro', {validacao: errors, dadosForm: dadosForm});
        return;
    }

    var connection = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    var JogoDAO = new application.app.models.JogoDAO(connection);

    UsuariosDAO.inserirUsuario(dadosForm);
    JogoDAO.gerarParametros(dadosForm.usuario);

    res.send('Opa');
}