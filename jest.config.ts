module.exports = {
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  extensionsToTreatAsEsm: ['.ts'], // <-- IMPORTANT
  transformIgnorePatterns: ['node_modules/(?!.*)'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest'],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
