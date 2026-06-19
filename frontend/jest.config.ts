export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  moduleNameMapper: {
    // Resolve @ imports the same way Vite does
    '^@/(.*)$': '<rootDir>/src/$1',
    // Vite ?raw imports return a string — stub with empty string in Jest
    '\\.md\\?raw$': '<rootDir>/src/__mocks__/markdownMock.ts',
    // ESM-only packages — stub for Jest
    '^react-markdown$': '<rootDir>/src/__mocks__/reactMarkdownMock.tsx',
    '^remark-gfm$': '<rootDir>/src/__mocks__/remarkGfmMock.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
}
