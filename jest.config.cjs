module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/main.jsx',
        '!src/**/*.test.{js,jsx,ts,tsx}',
    ],
    coverageThreshold: {
        global: {
            branches: 75,
            functions: 90,
            lines: 85,
            statements: 85,
        },
    },
};
