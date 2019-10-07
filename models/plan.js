module.exports = function(sequelize, DataTypes) {
    var Plan = sequelize.define("Plan", {
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      //NOT SURE IF I NEED (minutes available each day -- seems like necessary to accurately place recipes):
      //mMins
      //tMins
      //wMins
      //thMins
      //fMins
      //sMins
      //suMins
      maxMins: DataTypes.INTEGER,
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
  