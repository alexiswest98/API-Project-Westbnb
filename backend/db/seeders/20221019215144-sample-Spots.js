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
        name: 'New Construction SF Hous with City Views',
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
        address: '1110 Green St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.798628,
        lng: -122.417710,
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
      city: { [Op.is]: 'San Francisco' }
    }, {});
  }
};
