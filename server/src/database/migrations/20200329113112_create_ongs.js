//UP para criar a tabela, o que acontece quando criar a migration
exports.up = function(knex) {
//criando Table Ongs
  return knex.schema.createTable('ongs', function(table){

    table.string('id').primary(); //definindo chave primaria
    table.string('name').notNullable(); //definido não nulo
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); //limitando em duas casas
    
    });
};


//DOWN, se algo der errado faça:
exports.down = function(knex) {
   return knex.schema.dropTable('ongs'); //exclui a tabela
};
