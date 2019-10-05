//TODO:
// define many to many relationship between recipes/plans
module.exports = function(sequelize, DataTypes) {
    var Plan = sequelize.define("Plan", {
      start_date: DataTypes.STRING,
      end_date: DataTypes.STRING,
      totalMins: DataTypes.INTEGER
    });
  
    Plan.associate = function(models) {
      // We're saying that a Plan should belong to a User
      // A Plan can't be created without a User due to the foreign key constraint
      Plan.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });

      Plan.belongsToMany(models.Recipe, {
        as: 'plan',
        through: 'Recipe_Plan',
        foreignKey: 'plan_id'
      })

    };
    return Plan;
  };
  