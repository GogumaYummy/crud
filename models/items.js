const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Items extends Model {}
  Items.init(
    {
      itemId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      updatedAt: false,
    }
  );
  return Items;
};
