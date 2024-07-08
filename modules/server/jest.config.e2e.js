module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  testRegex: '(\\.|/)(spec)\\.[jt]sx?$',
  testEnvironment: 'node',
  testTimeout: 15000,
  reporters: [
    'default',
    // disable for now
    // 'jest-junit'
  ],
};
