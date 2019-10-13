module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    recipe_title: DataTypes.STRING,
    recipe_image: DataTypes.STRING,
    recipe_link: DataTypes.STRING,
    recipe_cuisines: DataTypes.STRING,
    recipe_time: DataTypes.STRING,
    recipe_servings: DataTypes.STRING,
    recipe_ingredients: DataTypes.STRING,
    recipe_steps: DataTypes.TEXT,
  },
    {
      timestamps: false
    });

  Recipe.associate = function (models) {

    Recipe.belongsToMany(models.Plan, {
      through: 'recipe_plans',
    })
  }

  return Recipe;
};