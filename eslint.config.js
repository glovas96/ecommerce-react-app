import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "18.3" },
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
      },
    },
    plugins: {
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      "react-refresh": reactRefresh,
      import: fixupPluginRules(importPlugin),
    },
    rules: {
      
      ...js.configs.recommended.rules,
      ...(react.configs?.recommended?.rules || {}),
      ...(react.configs?.["jsx-runtime"]?.rules || {}),
      ...(reactHooks.configs?.recommended?.rules || {}),

      "import/no-unresolved": "error",
      "import/named": "error",
      "import/no-duplicates": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
    },
    settings: {
      react: { version: "18.3" },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    plugins: {
      "@typescript-eslint": fixupPluginRules(tsPlugin),
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      "react-refresh": reactRefresh,
      import: fixupPluginRules(importPlugin),
    },
    rules: {
      ...js.configs.recommended.rules,
      ...(react.configs?.recommended?.rules || {}),
      ...(react.configs?.["jsx-runtime"]?.rules || {}),
      ...(reactHooks.configs?.recommended?.rules || {}),
      ...(tsPlugin.configs?.recommended?.rules || {}),
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/no-duplicates": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  eslintConfigPrettier,
];
