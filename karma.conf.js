/**
 * Karma config file for running unit tests with code coverage.
 */

// output a code coverage report if --coverage is passed on the command line
const coverage = process.argv.includes("--coverage")

module.exports = function(config) {
  config.set({
    browsers: ["ChromeHeadless"],  // "PhantomJS" works too, with karma-phantomjs-launcher@1.0.4 & phantomjs-prebuilt@2.1.16
    singleRun: true,

    client: {
      captureConsole: true
    },

    frameworks: ["jasmine", "karma-typescript"],

    files: [
      "src/**/*.ts",
      "src/**/*.test.js"
    ],

    preprocessors: {
      "**/*.ts": "karma-typescript",
      "**/*.test.js": "karma-typescript"
    },

    // https://github.com/monounity/karma-typescript/blob/master/cookbook.md
    karmaTypescriptConfig: {
      bundlerOptions: {
        resolve: {
          directories: [".", "node_modules"]
        },
        transforms: [require("karma-typescript-es6-transform")()]
      },
      compilerOptions: {
        allowJs: true
      },
      coverageOptions: {
        exclude: /\.test\.js$/
      },
      reports: {
        "html": "coverage",
        "text-summary": null  // null == console
        // "text": null  // null == console
      }
    },

    reporters: ["mocha", "karma-typescript"].slice(0, coverage ? 2 : 1),

    mochaReporter: {
      ignoreSkipped: true
    }
  })
}
