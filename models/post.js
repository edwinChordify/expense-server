'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' })

    }
  }
  Post.init({
    amount: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    despription: {
      type:
        DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};