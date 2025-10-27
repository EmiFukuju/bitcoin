export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '^.+\.(css|less|sass|scss)$' : 'identity-obj-proxy',
  },
  transform: {
    '^.+\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  testMatch: ['<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'mjs', 'cjs', 'ts', 'tsx'],
};