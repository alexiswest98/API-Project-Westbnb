'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE'
      }),
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATEONLY    //ex:'2022-01-17'
      // validate: {
      //   isDateBeforeToday(startDate){
      //     const currDate = new Date();
      //     if( new Date(startDate).toDateString() < currDate.toDateString()){
      //         throw new Error('Must be a valid start date.')
      //     }
      //   }
      // }
    },
    endDate: {
      type: DataTypes.DATEONLY
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
