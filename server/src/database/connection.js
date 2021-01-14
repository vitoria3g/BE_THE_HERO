const knex = require('knex');
const configuration = require('../../knexfile'); //configuraçõe do banco de dados

const connection = knex(configuration.development); //criando a conexão com o banco de dados

module.exports = connection; //permitindo a exportação da conexão