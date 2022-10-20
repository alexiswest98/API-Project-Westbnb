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
     await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'https://ssl.cdn-redfin.com/photo/9/bigphoto/353/422657353_0.jpg'
      },
      {
        reviewId: 2,
        url: 'https://ssl.cdn-redfin.com/photo/8/bigphoto/369/ML81901369_7_J.jpg'
      },
      {
        reviewId: 3,
        url: 'https://ssl.cdn-redfin.com/photo/9/bigphoto/839/422702839_61_0.jpg'
      },
      {
        reviewId: 4,
        url: 'https://ssl.cdn-redfin.com/photo/9/bigphoto/176/422701176_31_2.jpg'
      },
      {
        reviewId: 5,
        url: 'https://ssl.cdn-redfin.com/system_files/media/762646_JPG/item_13.jpg'
      },
      {
        reviewId: 6,
        url: 'https://ssl.cdn-redfin.com/photo/9/bigphoto/064/422702064_29_0.jpg'
      },
      {
        reviewId: 7,
        url: 'https://ssl.cdn-redfin.com/photo/9/bigphoto/224/422698224_19_0.jpg'
      },
      {
        reviewId: 8,
        url: 'https://ssl.cdn-redfin.com/photo/9/bigphoto/232/422695232_14_6.jpg'
      },
      {
        reviewId: 9,
        url: 'https://ssl.cdn-redfin.com/photo/9/bigphoto/659/422701659_2_4.jpg'
      },
      {
        reviewId: 10,
        url: 'https://ssl.cdn-redfin.com/photo/9/bigphoto/560/422696560_62_0.jpg'
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
     await queryInterface.bulkDelete('ReviewImages', {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
