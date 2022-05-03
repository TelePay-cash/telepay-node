/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 30000,
    setupFiles: ['dotenv/config'],
    coveragePathIgnorePatterns: [
        'node_modules'
    ],
    globals: {
        'ts-jest': {
            useESM: true
        },
    },
};
