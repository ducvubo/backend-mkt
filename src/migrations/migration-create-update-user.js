module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn('Users', 'anhdaidien', {
          type: Sequelize.BLOB("long"),
          allowNull: true
        }),
      ]);
    },
  
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'anhdaidien'),
      ]);
    }
  };
  