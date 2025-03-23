const { DataTypes, QueryInterface } = require("sequelize");

module.exports = {
  up: async ({ context: QueryInterface }) => {
    await QueryInterface.addColumn("users", "admin", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
    await QueryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "admin");
    await queryInterface.removeColumn("users", "disabled");
  },
};
