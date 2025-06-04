// jest.config.mjs
export default {
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"],
};
