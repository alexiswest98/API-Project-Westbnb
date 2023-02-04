'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true
      }),
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      }),
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT, 
      allowNull: false
    },
    stars: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        min: 1.00,
        max: 5.00
      }}
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
