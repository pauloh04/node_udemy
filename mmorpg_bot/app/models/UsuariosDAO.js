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

}

module.exports = function() {
    return UsuariosDAO;
}