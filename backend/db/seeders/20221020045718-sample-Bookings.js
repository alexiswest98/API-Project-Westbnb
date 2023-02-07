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
        spotId: 2,
        userId: 1,
        startDate: '2023-02-04',        //YYYY-MM-DD returns as a string
        endDate:'2023-02-12'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-02-04',
        endDate:'2023-02-12'
      },
      {
        spotId: 4,
        userId:3,
        startDate: '2023-02-04',
        endDate:'2023-02-12'
      },
      {
        spotId: 5,
        userId: 4,
        startDate: '2023-02-04',
        endDate:'2023-02-12'
      },
      {
        spotId: 6,
        userId: 5,
        startDate: '2023-02-04',
        endDate:'2023-02-12'
      },
      {
        spotId: 7,
        userId: 6,
        startDate: '2023-02-04',
        endDate:'2023-02-12'
      },
      {
        spotId: 8,
        userId: 7,
        startDate: '2023-02-04',
        endDate:'2023-02-12'
      },
      {
        spotId: 9,
        userId: 8,
        startDate: '2023-02-04',
        endDate:'2023-02-12'
      },
      {
        spotId: 10,
        userId: 9,
        startDate: '2023-02-04',
        endDate:'2023-02-12'
      },
      {
        spotId: 1,
        userId: 10,
        startDate: '2023-02-04',
        endDate:'2023-02-12'
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
     const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
