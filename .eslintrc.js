module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
  },
};
