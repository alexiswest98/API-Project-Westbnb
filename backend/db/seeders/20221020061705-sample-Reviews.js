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
     await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'Beautiful and clean home with incredible amenities!',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Their place is amazing! My family of 6 were completely comfortable and felt so fortunate to find this wonderful retreat!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Definitely the great shot for places around San Francisco area.',
        stars: 5
      },
      {
        spotId: 4,
        userId: 5,
        review: 'Incredible house and easygoing hosts. The location is nice too. Quiet and relaxed area yet centrally located to areas of interest in the Bay.',
        stars: 5
      },
      {
        spotId: 5,
        userId: 6,
        review: 'Beautiful house, great location, clean, good host, & wonderful gym!',
        stars: 4
      },
      {
        spotId: 6,
        userId: 7,
        review: 'Cute and cozy house in a family friendly neighborhood! So many food places near too!',
        stars: 3
      },
      {
        spotId: 7,
        userId: 8,
        review: 'This is my favorite Airbnb! Great place, clean, amazing views, great hosts.',
        stars: 5
      },
      {
        spotId: 8,
        userId: 9,
        review: 'Very nice place to stay. It is very close to attractions in the Bay Area in a quiet neighborhood. The amenities at the house were a plus as well!',
        stars: 3
      },
      {
        spotId: 9,
        userId: 10,
        review: 'My cousins and I came for a quick girls weekend to relax and catch some sun. We enjoyed the space to its fullest potential, will definitely consider coming again.',
        stars: 5
      },
      {
        spotId: 10,
        userId: 1,
        review: 'This place was an amazing property with a beautiful view of the bay. He was very courteous to us, and very hospitable.',
        stars: 5
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
     await queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
