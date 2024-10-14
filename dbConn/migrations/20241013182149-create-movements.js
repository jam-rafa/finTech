"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Movements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      cost_type: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.FLOAT,
      },
      natureId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Natures", key: "id" },
      },
      payment_typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "PaymentTypes", key: "id" },
      },
      cost_centerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "CostCenters", key: "id" },
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
    await queryInterface.dropTable("Movements");
  },
};
