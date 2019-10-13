module.exports = function(sequelize, DataTypes) {
    var Plan = sequelize.define("Plan", {
      start_date: {
        type: DataTypes.STRING,
        allowNull: true
      },
      end_date: 
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      //Will likely need: Minutes available/Hours available each day
      //mMins
      //tMins
      //wMins
      //thMins
      //fMins
      //sMins
      //suMins
      maxMins: 
      {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      totalMins: 
      {
        type: DataTypes.INTEGER,
        allowNull: true
      }},
    {timestamps: false
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
        through: 'recipe_plans',
      })

    };
    return Plan;
  };
  