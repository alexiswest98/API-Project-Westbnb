'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: '2022-10-01',        //YYYY-MM-DD returns as a string
        endDate:'2022-11-01'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2022-10-02',
        endDate:'2022-11-02'
      },
      {
        spotId: 3,
        userId:3,
        startDate: '2022-10-03',
        endDate:'2022-11-03'
      },
      {
        spotId: 4,
        userId: 4,
        startDate: '2022-10-04',
        endDate:'2022-11-04'
      },
      {
        spotId: 5,
        userId: 5,
        startDate: '2022-10-05',
        endDate:'2022-11-05'
      },
      {
        spotId: 6,
        userId: 6,
        startDate: '2022-10-06',
        endDate:'2022-11-06'
      },
      {
        spotId: 7,
        userId: 7,
        startDate: '2022-10-07',
        endDate:'2022-11-07'
      },
      {
        spotId: 8,
        userId: 8,
        startDate: '2022-10-08',
        endDate:'2022-11-08'
      },
      {
        spotId: 9,
        userId: 9,
        startDate: '2022-10-09',
        endDate:'2022-11-09'
      },
      {
        spotId: 10,
        userId: 10,
        startDate: '2022-10-10',
        endDate:'2022-11-10'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings');
  }
};
