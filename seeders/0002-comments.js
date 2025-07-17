module.exports = {
  up: async ({ context: queryInterface }) => {
    const todos = await queryInterface.sequelize.query('SELECT id FROM todos', { type: queryInterface.sequelize.QueryTypes.SELECT });
    const now = new Date();
    const comments = todos.map(todo => ({ text: `Comment for todo ${todo.id}`, todoId: todo.id, createdAt: now, updatedAt: now }));
    if (comments.length) {
      await queryInterface.bulkInsert('comments', comments);
    }
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
