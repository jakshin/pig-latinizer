const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const globals = require("globals");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,

        globals: {
            ...globals.browser,
            ...globals.node,
            afterAll: "readonly",
            afterEach: "readonly",
            beforeAll: "readonly",
            beforeEach: "readonly",
            describe: "readonly",
            expect: "readonly",
            fail: "readonly",
            it: "readonly",
            jasmine: "readonly",
            spyOn: "readonly",
        },

        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
                modules: true,
            },
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    // start with recommended rule sets as a baseline
    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

    // see https://eslint.org/docs/rules/ for rule definitions;
    // 0 == "off", 1 == "warn", 2 == "error"
    rules: {
        // turn off recommended rules that I don't care for
        "no-inner-declarations": 0,
        "@typescript-eslint/no-var-requires": 0,

        // override some recommendations with my own preferences
        "no-unused-vars": [2, {
            args: "none",
        }],

        // be more prescriptive about some things than ESLint's recommendations
        "accessor-pairs": 2,
        "array-bracket-spacing": [2, "never"],
        "array-callback-return": 2,
        "arrow-spacing": 2,
        "block-scoped-var": 2,
        "block-spacing": 2,

        "brace-style": [2, "stroustrup", {
            allowSingleLine: true,
        }],

        "comma-spacing": 2,
        "comma-style": 2,
        "computed-property-spacing": 2,
        "curly": [2, "all"],
        "eol-last": 2,
        "eqeqeq": [2, "smart"],
        "func-call-spacing": 2,
        "generator-star-spacing": 2,
        "indent": ["error", 2],
        "jsx-quotes": 2,

        "key-spacing": [2, {
            mode: "minimum",
        }],

        "keyword-spacing": 2,

        "lines-around-comment": [2, {
            allowArrayStart: true,
            allowBlockStart: true,
            allowClassStart: true,
            allowObjectStart: true,
            beforeBlockComment: true,
            beforeLineComment: true,
        }],

        "max-statements-per-line": 2,
        "new-cap": 2,
        "new-parens": 2,
        "no-alert": 2,
        "no-array-constructor": 2,
        "no-caller": 2,
        "no-confusing-arrow": 2,

        "no-constant-condition": [2, {
            checkLoops: false,
        }],

        "no-div-regex": 2,
        "no-eval": 2,
        "no-extend-native": 2,
        "no-extra-bind": 2,
        "no-extra-label": 2,
        "no-floating-decimal": 2,

        "no-implicit-coercion": [2, {
            allow: ["!!"],
        }],

        "no-implied-eval": 2,
        "no-invalid-this": 2,
        "no-iterator": 2,
        "no-label-var": 2,
        "no-lone-blocks": 2,
        "no-loop-func": 2,
        "no-mixed-operators": 2,
        "no-multiple-empty-lines": 2,
        "no-nested-ternary": 2,
        "no-new-func": 2,
        "no-new-object": 2,
        "no-new-wrappers": 2,
        "no-new": 2,
        "no-octal-escape": 2,
        "no-proto": 2,
        "no-restricted-globals": [2, "fdescribe", "fit"],
        "no-return-assign": 2,
        "no-return-await": 1,
        "no-script-url": 2,
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-shadow-restricted-names": 2,
        "no-throw-literal": 2,
        "no-trailing-spaces": 2,
        "no-unmodified-loop-condition": 2,
        "no-unneeded-ternary": 2,
        "no-unused-expressions": 2,
        "no-useless-call": 2,
        "no-useless-computed-key": 2,
        "no-useless-concat": 2,
        "no-useless-constructor": 2,
        "no-var": 2,

        "no-warning-comments": [2, {
            terms: ["xxx", "!!!"],
            location: "anywhere",
        }],

        "no-whitespace-before-property": 2,
        "no-with": 2,
        "object-curly-spacing": [2, "always"],
        "operator-linebreak": 2,
        "padded-blocks": [2, "never"],

        "prefer-const": [2, {
            destructuring: "any",
        }],

        "prefer-template": 2,
        "quote-props": [2, "consistent-as-needed"],

        "quotes": [2, "double", {
            allowTemplateLiterals: true,
            avoidEscape: true,
        }],

        "rest-spread-spacing": [2, "never"],
        "semi-spacing": 2,
        "semi": [2, "never"],
        "space-before-blocks": 2,
        "space-before-function-paren": [2, "never"],
        "space-in-parens": [2, "never"],
        "space-infix-ops": 2,
        "space-unary-ops": 2,
        "spaced-comment": 2,
        "switch-colon-spacing": 2,
        "template-curly-spacing": [2, "never"],
        "template-tag-spacing": 2,
        "wrap-iife": 2,
        "yield-star-spacing": 2,

        "yoda": [2, "never", {
            exceptRange: true,
        }],
    },
}, globalIgnores(["lib/", "types/", "eslint.config.js"])]);
