// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */

//     await queryInterface.bulkInsert('Spots', [
//       {
//         ownerId: 1,
//         address: '305 N Shore Dr',
//         city: 'Miami Beach',
//         state: 'Florida',
//         country: 'USA',
//         lat: 25.861260,
//         lng: -80.132830,
//         name: 'True masterpiece Miami Beach construction',
//         description: 'This property boasts a 12,172 sq. ft. lot with 78 feet of prime waterfront and breathtaking views',
//         price: 3000
//       },
//       {
//         ownerId: 1,
//         address: '54 E Scott St',
//         city: 'Chicago',
//         state: 'Illinois',
//         country: 'USA',
//         lat: 41.904971,
//         lng: -87.6266848,
//         name: 'Contemporary addition to historic Chicago District',
//         description: 'Set on an oversized 45 x 145-foot lot, this home offers privacy, security, and serenity',
//         price: 800
//       },
//       {
//         ownerId: 1,
//         address: '154 Spring St',
//         city: 'New York',
//         state: 'New York',
//         country: 'USA',
//         lat: 40.724200,
//         lng: -74.001660,
//         name: 'Penthouse located in the heart of Soho',
//         description: '4,131 square feet layered throughout 3 vast unique floors, an open gas fireplace, 4 bedrooms, 4.5 baths',
//         price: 920
//       },
//       {
//         ownerId: 1,
//         address: '2459 Laurel Pass',
//         city: 'Los Angeles',
//         state: 'California',
//         country: 'USA',
//         lat: 34.115880,
//         lng: -118.381650,
//         name: 'Designer owned, 1920s Laurel Canyon retreat',
//         description: 'The extraordinary 3 bd 3 ba plus family room home has been brilliantly restored for contemporary living',
//         price: 210
//       }
//     ])
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//     const Op = Sequelize.Op;
//     await queryInterface.bulkDelete('Spots', {
//       city: { [Op.in]: ['Miami Beach', 'Los Angeles', 'New York', 'Chicago'] }
//     }, {});
//   }
// };
