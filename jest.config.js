/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        'node_modules',
        'test/utils'
    ],
    globals: {
        'ts-jest': {
            useESM: true
        },
    },
};
