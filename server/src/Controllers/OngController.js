const crypto     = require('crypto'); //criptografia do node
const connection = require('../database/connection'); //conexão banco de dados

module.exports = {

    //listar
    async index (request, response) {

        //conectando na tabela ongs e selecionando todos os dados                 
        const ongs = await connection('ongs').select('*'); 

        response.json(ongs); //respondendo a requisição
    },

    //criar
    async create (request,response) { //função assincrona

        //limitando o que será recebido pelo usuário (desestruração)
        const {name,email,whatsapp,city,uf} = request.body; //pegando o corpo da resposta
        
        //Criando o ID das Ongs
        const id = crypto.randomBytes(4).toString('HEX'); //Criando uma criptografia com bytes distintos que sejam hexadecimal 
            
        //criando o insert na tabela:
        await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf,
        });
        
        return response.json({id}); //reespondendo ao usuário o ID criado
   }

};