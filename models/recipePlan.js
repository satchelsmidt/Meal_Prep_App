module.exports = function(sequelize, DataTypes) {
    var Recipe_Plan = sequelize.define("recipe_plans",
    //trying to apply this, but won't create table if this is enabled
      // {
      //   timestamps: false
      // }
      
    );
  
    return Recipe_Plan;
  };
  