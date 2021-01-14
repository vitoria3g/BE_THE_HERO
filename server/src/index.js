const express = require('express'); //importa o express
const app = express(); //instancia o express
const cors = require('cors'); //requerimento de permissão (pesquisar a respeito)
const routes = require('./routes'); //importando as rotas 

app.use(cors());
app.use(express.json());//serve para informar ao programa que todas as requisições deverão ser transformadas em OBJ javascript (JSON)
                        //DEVE ser colocado antes das rotas da aplicação

app.use(routes); //fazendo a aplicação usar as rotas

app.listen(3333); //o app escuta a porte '3333' (http://localhost:3333/)