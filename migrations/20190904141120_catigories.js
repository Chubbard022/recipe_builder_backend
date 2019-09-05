
exports.up = function(knex) {
  return knex.schema
    .createTable("categories", category=>{

        category.increments()//primary key

        category.string("name",30)//name of category
                .notNullable()
            
    })
    .createTable("recipes", recipe=>{

        recipe.increments()//primary key

        recipe.string("name",50)//name of recipe
            .notNullable()

        recipe.string("instructions")//instructions to recipe
            .notNullable()

        recipe.string("time")//time of recipe prep
            .notNullable()

        recipe.string("ingredients")//ingredients to recipe

        recipe.integer("category_id")//fk to category
            .unsigned()
            .references("id")
            .inTable("categories")
            .onDelete("RESTRICT")
            .onUpdate("RESTRICT")
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("recipes")
    .dropTableIfExists("categories")

};
