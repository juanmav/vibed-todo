const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('todos', [
      { title: 'Buy milk', completed: false, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Walk dog', completed: false, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Write tests', completed: false, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('todos', null, {});
  }
};
