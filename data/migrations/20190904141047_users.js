
exports.up = function(knex) {
    return knex.schema.createTable("users", user=>{
  
          user.increments("id")
  
          user.string("username",50)
              .notNullable()
              .unique()
          user.string("password",255)
              .notNullable()
          
              
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users")
  };
  