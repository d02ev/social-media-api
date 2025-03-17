import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.js"],
    ignores: ["dist/", "node_modules/", ".env.*", "eslint.config.mjs", "prettier.config.mjs", "*.json", ".sequelizerc"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.node,
        console: "readonly"
      }
    },
    rules: {
      "no-var": "error",
      "no-unused-vars": "warn",
      "no-console": "warn"
    }
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];