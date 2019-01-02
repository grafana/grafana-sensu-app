
module.exports = {
    "testEnvironment": "node",
    "collectCoverage": true,
    "transform": {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.(j|t)sx?$": "ts-jest",
      "^.+\\.js$": "./node_modules/babel-jest"
    },
    "testRegex": "(\\.|/)(spec|jest)\\.(jsx?|tsx?)$",
    "roots": [
      "tests",
      "src"
    ],
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
