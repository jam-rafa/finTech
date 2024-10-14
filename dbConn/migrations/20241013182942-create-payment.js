"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      installment: {
        type: Sequelize.INTEGER,
      },
      installment_value: {
        type: Sequelize.FLOAT,
      },
      expiration_date: {
        type: Sequelize.DATE,
      },
      movementsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Movements", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Payments");
  },
};
