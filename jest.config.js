
module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  testMatch: ['**/__tests__/**/*.test.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  "transformIgnorePatterns": [
    "node_modules/(?!(react-native|my-project|react-native-button)/)"
  ]
};