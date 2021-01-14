
exports.up = function(knex) {
  //criando Table Incidents
  return knex.schema.createTable('incidents', function(table){

    table.increments(); //definindo um incremento a chave primaria

    table.string('title').notNullable(); //definido não nulo
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable(); //campo que receberá a ligação FK 

    //tabela.FK.(id).referenciando.(id_table_a_ser_referenciada).naTabela(nome_Table)
    table.foreign('ong_id').references('id').inTable('ongs'); //criando chave estrangeira 
    
    });
};

exports.down = function(knex) {
  
    return knex.schema.dropTable('incidents');
};
