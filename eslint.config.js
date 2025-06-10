import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig({
  root: true,
  env: { browser: true, es2021: true },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    sourceType: "module",
  },
  files: ["**/*.{js,mjs,cjs,vue}"],
  plugins: { js: {} },
});
