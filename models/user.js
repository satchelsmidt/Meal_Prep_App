
var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {

  var User = sequelize.define("User", {
    // Giving the USER model a username and a password that we store
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
    ,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {timestamps: false
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  //Associating each user with a number of plans made by them. Deleting a user deletes all associated plans
  User.associate = function (models) {
    User.hasMany(models.Plan, {
      onDelete: "cascade"
    });
  };

  return User;
};