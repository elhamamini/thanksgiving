const Sequelize = require("sequelize");
const { db } = require("../connection");

const Dish = db.define("dish", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = { Dish };
