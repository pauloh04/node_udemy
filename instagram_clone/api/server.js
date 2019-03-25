var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    objectId = require('mongodb').ObjectId,
    connectMultiparty = require('connect-multiparty'),
    fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(connectMultiparty());
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var port = 8080;

app.listen(port);

var db = new mongodb.Db('instagram', new mongodb.Server('localhost', 27017, {}), {});

console.log('Servidor HTTP esta escutando na porta ' + port);

app.get('/', function(req,res){
    res.send({msg:'Olá'});
});

app.post('/api', function(req,res){
    var date = new Date();

    var nome_imagem = date.getTime() + '_' + req.files.arquivo.originalFilename;
    var titulo_imagem = req.body.titulo;
    var path_origem = req.files.arquivo.path;
    var path_destino = './uploads/' + nome_imagem;

    fs.rename(path_origem, path_destino, function(err){
        if(err){
            res.status(500).json({error : err});
            return;
        }

        var dados = {
            url_imagem: nome_imagem,
            titulo: titulo_imagem
        }

        db.open(function(err, mongoclient){
            mongoclient.collection('postagens', function(err, collection){
                collection.insert(dados, function(err, records){
                    if(err){
                        res.status(500).json(err);
                    } else {
                        res.status(200).json({'status': 'foi'});
                    }
                    mongoclient.close();
                });
            });
        });
    });
});

app.get('/api', function(req,res){
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.find().toArray(function(err, results){
                if(err){
                    res.json(err);
                } else {
                    res.json(results);
                }
                mongoclient.close();
            });
        });
    });
});

app.get('/api/:id', function(req,res){
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.find(objectId(req.params.id)).toArray(function(err, results){
                if(err){
                    res.json(err);
                } else {
                    res.json(results);
                }
                mongoclient.close();
            });
        });
    });
});

app.put('/api/:id', function(req,res){
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.update(
                {_id : objectId(req.params.id)}, 
                { $push : { 
                    comentarios : {
                        id_comentario: new objectId(),
                        comentario: req.body.comentario
                    }
                }}, 
                {}, 
                function(err, result){
                    if(err){
                        res.json(err);
                    } else {
                        res.json(result);
                    }
                    mongoclient.close();
                }
            );
        });
    });
});

app.delete('/api/:id', function(req,res){
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.update(
                {}, 
                { $pull: {
                    comentarios: {id_comentario: objectId(req.params.id)}
                }},
                {multi: true},
                function(err, result){
                    if(err){
                        res.json(err);
                    } else {
                        res.status(200).json(result);
                    }
                    mongoclient.close();
                }
            );
        });
    });
});

app.get('/uploads/:imagem', function(req,res){
    var img = req.params.imagem;
    fs.readFile('./uploads/' + img, function(err, content){
        if(err){
            res.status(400).json(err);
            return;
        }
        res.writeHead(200, {'content-type' : 'image/jpg'});
        res.end(content);
    });
});