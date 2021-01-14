const express             = require('express');
const routes              = express.Router();
const ongController       = require('./Controllers/OngController');
const IncidentsController = require('./Controllers/IncidentsController');
const ProfileController   = require('./Controllers/ProfileController');
const SessionController   = require('./Controllers/SessionController');

//CONFIGURANDO ROTAS DA APLICAÇÃO

//ONGS
routes.get('/ongs', ongController.index); //listando as ongs cadastradas
routes.post('/ongs', ongController.create); //Criando o cadastro de Ongs
routes.post('/session', SessionController.index); //verificando se a ONG existe 

//CASOS
routes.get('/incidents', IncidentsController.index); //Cadastrando caso
routes.post('/incidents', IncidentsController.create); //Criando o cadastro de Incidentes
routes.delete('/incidents/:id', IncidentsController.delete); //Deletando Caso

//Casos por ONG
routes.get('/profile', ProfileController.index); //listagem de todos os casos de uma só ONG

module.exports = routes; //permitindo que esse arquivo seja acessao externamente