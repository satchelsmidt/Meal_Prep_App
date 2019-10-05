//TODO:
// define many to many relationship between recipes/plans
module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {});
  
    Recipe.associate = function(models) {
      // Recipe.belongsTo(models.Plan, {
      //   //Not sure I need this section within this model? confirm
      //   foreignKey: {
      //     allowNull: false
      //   }
      // });

      Recipe.belongsToMany(models.Plan, {
        as: 'recipe',
        through: 'Recipe_Plan',
        foreignKey: 'recipe_id'
      })

    };
    return Recipe;
  };