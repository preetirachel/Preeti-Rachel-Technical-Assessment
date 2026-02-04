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
            branches: 100,
            functions: 100,
            lines: 97,
            statements: 98,
        },
    },
};
