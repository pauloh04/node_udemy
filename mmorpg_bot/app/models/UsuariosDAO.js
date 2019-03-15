class UsuariosDAO {
    constructor(connection) {
        this._connection = connection();
    }

    inserirUsuario(usuario) {
        this._connection.open(function(err, mongoclient){
            mongoclient.collection("usuarios", function(err, collection){
                collection.insert(usuario);
                mongoclient.close();
            });
        });
    }

    autenticarUsuario(usuario, req, res){
        this._connection.open(function(err, mongoclient){
            mongoclient.collection("usuarios", function(err, collection){
                collection.find(usuario).toArray(function(err, result){
                    if(result[0] != undefined){
                        req.session.autorizado = true;
                        req.session.usuario = result[0].usuario;
                        req.session.casa = result[0].casa;
                    }

                    if(req.session.autorizado){
                        res.redirect("jogo");
                    }else{
                        res.render('index', {validacao: {}});
                    }
                });
                mongoclient.close();
            });
        });
    }

}

module.exports = function() {
    return UsuariosDAO;
}