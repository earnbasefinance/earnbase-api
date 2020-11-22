"use strict";

const path = require("path");
module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:promise/recommended",
        "eslint-config-jsdoc",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
        "prettier/@typescript-eslint",
        "prettier/babel",
    ],
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
        process: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: path.join(__dirname, "./tsconfig.json"),
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            impliedStrict: true,
            jsx: false,
        },
    },
    plugins: ["@typescript-eslint", "jsdoc", "promise"],
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        polyfills: ["promises"],
        "import/resolver": {
            node: {
                moduleDirectory: "node_modules",
            },
        },
    },
    rules: {
        "@typescript-eslint/unbound-method": 0,
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "keyword-spacing": [
            "error",
            {
                before: true,
                after: true,
            },
        ],
        "arrow-parens": ["error", "always"],
        "@typescript-eslint/restrict-template-expressions": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/no-unsafe-member-access": 0,
        "@typescript-eslint/no-unsafe-assignment": 0,
        "@typescript-eslint/no-unsafe-call": 0,
        "@typescript-eslint/no-unsafe-return": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "arrow-parens": 0,
    },
};
