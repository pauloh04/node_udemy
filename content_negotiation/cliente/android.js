var http = require('http');

var opcoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var html = 'nome=Jose';
var string_json = JSON.stringify({nome: 'Jose'});

var buffer_corpo_resposta = [];

var req = http.request(opcoes, function(res){
   
   res.on('data', function(pedaco){
       buffer_corpo_resposta.push(pedaco);
   });

   res.on('end', function(){
       console.log(Buffer.concat(buffer_corpo_resposta).toString());
   });

});

req.write(string_json);
req.end();