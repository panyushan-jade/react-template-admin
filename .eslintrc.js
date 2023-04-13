module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": [2], //禁止出现未使用的变量
    "no-var": 2,
    "arrow-spacing": [2, { before: true, after: true }], //箭头函数前后空格
    "@typescript-eslint/no-non-null-assertion": "off", //非空断言
  },
};
