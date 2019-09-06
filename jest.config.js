
module.exports = {
    "testEnvironment": "node",
    "collectCoverage": true,
    "transform": {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.(j|t)sx?$": "ts-jest"
    },
    "testRegex": "(\\.|/)(spec|jest)\\.(jsx?|tsx?)$",
    "roots": [
      "tests",
      "src"
    ],
    "moduleNameMapper": {
      "grafana/app/core/utils/kbn": "<rootDir>/tests/__mocks__/app/core/utils/kbn.ts",
    },
    "moduleDirectories": [
      "node_modules",
      "src"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
};
