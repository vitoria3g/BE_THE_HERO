const connection = require('../database/connection'); //conexão banco de dados


module.exports = {

    //Listar
    async index (request,response){
        const {page = 1} = request.query; //pegando o n° da página atual, caso não tenha então fica como 1°

        //isso é o mesmo que count[0]
        const [count] = await connection('incidents').count(); //contando quantos casos tem cadastrados
        //console.log(count);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //criando um JOIN entre a table ong e incidents
        .limit(5) //limitando em 5 registros
        .offset((page - 1)*5) //pula 5 registros por pág. Sendo que na primeira ele trás 5 pois 1-1 = 0*5 = não vai pular NENHUM registro 
        .select(['incidents.*',
                 'ongs.name',
                 'ongs.whatsapp',
                 'ongs.city', 
                 'ongs.uf']); 
        //ESQUEMA DE PÁGINAÇÃO DAS PÁGS -> A CIMA 

        //adicionando um item ao header, a qtd de itens cadastrados
        response.header('X-Total-Count', count['count(*)']); //'count(*)' vem da resposta da contagem dos itens

        return response.json(incidents); //retornando a resposta

    },

    //Criar
    async create(request,response){

        const {title, description, value} = request.body; //desestruturando o corpo da requisição
        const ong_id = request.headers.authorization; //pegando o ID da Ong do cabeçalho da requisição. Nele encontramos dados do usuário logado.

        //desmembrando a resposta da inserção
        const [id] = await connection('incidents').insert({
            
            title,
            description,
            value,
            ong_id,

        });

        response.json({id}); //retornando o ID da inserção 

    },

    async delete(request, response){

        const {id} = request.params; //pegando o que foi enviado junto a requisição ex: 'incidents?id:1'
        const ong_id = request.headers.authorization; //pegando o ID da ong que está autenticada

                                //selecionando o primeiro registro da table 'incidents' o campo 'ong_id' onde o ID é igual a:
        const incidents = await connection('incidents').where('id', id).select('ong_id').first();

        if(incidents.ong_id !== ong_id){
                            //ERROS HTTP CODE
            return response.status(401).json({error: 'Operation not permitted.'}); //usuário sem permissão
        
        }

        await connection('incidents').where('id',id).delete();
                        //SUCESS sem retorno
        return response.status(204).send();
        
        }

    };