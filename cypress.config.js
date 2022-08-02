const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      BaseUrl= 'https://juice-shop.guardrails.ai',
      UserName= 'piyathida.sanaoun01@gmail.com',
      Password= '123456'
      
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
      
      
    },
    specPattern:"cypress/integration/*exercise/*.js"
  }
  },
  );
