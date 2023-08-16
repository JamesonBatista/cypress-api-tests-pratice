const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      environment: 'QA',  // aqui definimos que ambiente os testes serão gerados
      QA: {
        api: 'https://reqres.in/api/users?page=2'
      },
      DEV: {},
      PROD: {}
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
