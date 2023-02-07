'use strict';
const bcrypt = require("bcryptjs");

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

    await queryInterface.bulkInsert('Users', [
      { firstName: 'Jordan',
        lastName: 'Poole',
        email: 'jordanp@gmail.com',
        username: 'pooleparty',
        hashedPassword: bcrypt.hashSync('password4')
      },
      { firstName: 'Stephen',
        lastName: 'Curry',
        email: 'stephcurr@user.io',
        username: 'splashbro1',
        hashedPassword: bcrypt.hashSync('password5')
      },
      { firstName: 'Klay',
        lastName: 'Thompson',
        email: 'klaythomp@user.io',
        username: 'splashbro2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      { firstName: 'Draymond',
        lastName: 'Green',
        email: 'drayg@user.io',
        username: 'ogwarrior',
        hashedPassword: bcrypt.hashSync('password7')
      },
      { firstName: 'Andre',
        lastName: 'Iguodala',
        email: 'andreig@user.io',
        username: 'iggy',
        hashedPassword: bcrypt.hashSync('password8')
      },
      { firstName: 'Andrew',
        lastName: 'Wiggins',
        email: 'awig@user.io',
        username: 'wiggins',
        hashedPassword: bcrypt.hashSync('password9')
      },
      { firstName: 'Jonathun',
        lastName: 'Kuminga',
        email: 'jonkum@user.io',
        username: 'bucketsallday',
        hashedPassword: bcrypt.hashSync('password10')
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
     await queryInterface.bulkDelete('Users', {
       username: { [Op.in]: ['pooleparty', 'splashbro1', 'splashbro2', 'ogwarrior', 'iggy',
      'wiggins', 'bucketsallday'] }
     }, {});
  }
};
