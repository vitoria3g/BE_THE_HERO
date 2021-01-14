//PARA VALIDAR SE UMA ONG EXISTE E PODE FZER LOGIN
const connection = require('../database/connection'); //conexão banco de dados

module.exports = {

    async index (request,response){

        const {id} = request.body; //selecionando o ID do corpo da requisição
                          //selecione o 1 item encontrado com esse ID na tabela ongs
        const ong = await connection('ongs').where('id', id).select('name').first();

        if(!ong){
                            //ERRO HTTP CODE 
            return response.status(400).json({error: 'No ONG found with this ID'}); //não há uma ONG com esse ID
        }

        return response.json(ong);
    } 


};