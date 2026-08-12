const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.plugin("fork-ts-checker").tap((options) => {
      options[0].async = false;
      return options;
    });
  },
});
