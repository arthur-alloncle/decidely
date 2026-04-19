"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash("password123", 10);

    // ===== USERS =====
    const users = [];

    for (let i = 0; i < 10; i++) {
      users.push({
        id: uuidv4(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password,
        date_of_birth: faker.date.birthdate(),
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("users", users);

    // ===== CATEGORIES =====
    const categories = [
      {
        id: "2f48e7c3-ba7e-4b52-bd6f-7d748f0fd2ba",
        name: "career",
        display_name: "Travail",
      },
      {
        id: "0bb7beb5-5cfd-4de2-9062-e468cfe047e5",
        name: "finance",
        display_name: "Argent",
      },
      {
        id: "3688119f-f414-4de4-a3db-9423718f9871",
        name: "health",
        display_name: "Santé",
      },
      {
        id: "bbaf2453-b012-42c8-8aea-3f9ef9756ad7",
        name: "relationship",
        display_name: "Relations",
      },
      {
        id: "9699cbf6-a08a-4ce5-b8d9-f44faad88058",
        name: "project",
        display_name: "Projet",
      },
      {
        id: "30ce0986-eaa9-4fe6-9a36-9895b5b1eada",
        name: "personal",
        display_name: "Personnel",
      },
    ].map((cat) => ({
      ...cat,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("categories", categories);

    // ===== DECISIONS =====

    const decisions = [];

    for (let i = 0; i < 150; i++) {
      const createdAt = faker.date.between({
        from: new Date("2026-01-01"),
        to: Date.now(),
      });

      // différence en jours
      const daysDiff =
        (new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

      let outcome;

      // logique métier
      if (daysDiff < 10) {
        // décision récente → souvent non évaluée
        outcome = faker.helpers.weightedArrayElement([
          { value: null, weight: 60 },
          { value: 1, weight: 20 },
          { value: 0, weight: 20 },
        ]);
      } else {
        // décision ancienne → évaluée
        outcome = faker.helpers.weightedArrayElement([
          { value: 1, weight: 40 },
          { value: 0, weight: 50 },
          { value: null, weight: 10 },
        ]);
      }
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      decisions.push({
        id: uuidv4(),
        title: faker.lorem.sentence(3),
        confidence: faker.number.float({ min: 0.3, max: 0.95 }),
        outcome,
        importance: faker.number.int({ min: 1, max: 4 }),
        user_id: randomUser.id,
        category_id: randomCategory.id,
        createdAt,
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("decisions", decisions);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("decisions", null, {});
    await queryInterface.bulkDelete("categories", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
