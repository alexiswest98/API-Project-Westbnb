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

    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '1110 Green St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.798610,
        lng:-122.417650,
        name: 'New Construction SF House with City Views',
        description: '4 Bed 6 Bath House with Sauna',
        price: 500
      },
      {
        ownerId: 2,
        address: '72 Meadowbrook Dr',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.732910,
        lng: -122.484320,
        name: ' Modern & Luxurious Home in Desirable Lake Shore!',
        description: 'Fully Renovated, 2-level 2,069 SQFT, 4 Bed 3 Bath Home',
        price: 300
      },
      {
        ownerId: 3,
        address: '80 El Verano Way',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.731380,
        lng: -122.461330,
        name: 'Stunning 2020 Mediterranean Villa',
        description: '5 Bed 4 Bath House with large front patio',
        price: 350
      },
      {
        ownerId: 4,
        address: '422 Valley St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.744370,
        lng: -122.431840,
        name: 'Fabulous Home in Noe Valley',
        description: '4 Bed 4 Bath House with front and back patio',
        price: 225
      },
      {
        ownerId: 5,
        address: '251 Summit Way',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.715320,
        lng: -122.477120,
        name: 'Golf clubs & beautiful Lake Merced Home',
        description: 'Updated with custom upgrades throughout, 4 Bed 4 Bath floor plan',
        price: 480
      },
      {
        ownerId: 6,
        address: '118 Middlefield Dr',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.731881,
        lng: -122.485983,
        name: 'West Portal Hidden Gem',
        description: 'Detached 4 Bed 3 Bath updated home with 2 Door Garage',
        price: 125
      },
      {
        ownerId: 7,
        address: '1685 Dolores St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.742463,
        lng: -122.423981,
        name: 'Downtown Views and New Construction SF Home',
        description: '6 Bed 8 Bath in a quiet corner of Noe Valley',
        price: 620
      },
      {
        ownerId: 8,
        address: '2085 Ocean Ave',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.726232,
        lng: -122.465724,
        name: 'New Kitchen and Dining Room Home on Ocean',
        description: '4 bed 3 Bath and Den home on an extra large lot',
        price: 167
      },
      {
        ownerId: 9,
        address: '65 Keystone Way',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.727143,
        lng: -122.462773,
        name: 'Spanish Mediterranean home near Sweet Mt. Davidson Manor',
        description: '5 bed 2 Bath Houe with beautiful fireplace and arched living room ceiling',
        price: 340
      },
      {
        ownerId: 10,
        address: '527 Oak Park Dr',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.755679,
        lng: -122.460715,
        name: 'SF Panoramic Western Views',
        description: 'Newly rebuilt to-the-studs in 2015 w/extensive seismic upgrades 4 bed 3 Bath',
        price: 490
      },
      {
        ownerId: 1,
        address: '305 N Shore Dr',
        city: 'Miami Beach',
        state: 'Florida',
        country: 'USA',
        lat: 25.861260,
        lng: -80.132830,
        name: 'True masterpiece Miami Beach construction',
        description: 'This property boasts a 12,172 sq. ft. lot with 78 feet of prime waterfront and breathtaking views',
        price: 3000
      },
      {
        ownerId: 1,
        address: '54 E Scott St',
        city: 'Chicago',
        state: 'Illinois',
        country: 'USA',
        lat: 41.904971,
        lng: -87.6266848,
        name: 'Contemporary addition to historic Chicago District',
        description: 'Set on an oversized 45 x 145-foot lot, this home offers privacy, security, and serenity',
        price: 800
      },
      {
        ownerId: 1,
        address: '154 Spring St',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        lat: 40.724200,
        lng: -74.001660,
        name: 'Penthouse located in the heart of Soho',
        description: '4,131 square feet layered throughout 3 vast unique floors, an open gas fireplace, 4 bedrooms, 4.5 baths',
        price: 920
      },
      {
        ownerId: 1,
        address: '2459 Laurel Pass',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA',
        lat: 34.115880,
        lng: -118.381650,
        name: 'Designer owned, 1920s Laurel Canyon retreat',
        description: 'The extraordinary 3 bd 3 ba plus family room home has been brilliantly restored for contemporary living',
        price: 210
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
     await queryInterface.bulkDelete('Spots', {
      city: { [Op.in]: ['San Francisco', 'Miami Beach', 'Los Angeles', 'New York', 'Chicago'] }
    }, {});
  }
};
