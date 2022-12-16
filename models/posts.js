const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {}
  Posts.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      paranoid: true,
    }
  );
  return Posts;
};
