const nextJest = require('next/jest');

const createJestConfig = nextJest({
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
      babelConfig: true,
      diagnostics: false,
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/server/'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  preset: 'ts-jest',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/mocks.ts',
    '\\.(css|less|scss|html)$': '<rootDir>/test/mocks.ts',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks$': '<rootDir>/src/hooks',
    '^@(Server)(.*)$': '<rootDir>/server/$2',
    '^@([A-Z].*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
